// import ChallengeEmail from "@/emails/challenge";
// import { env } from "@/env";
import ChallengeEmail from "../../emails/challenge";
import { bcryptPasswordCompare, bcryptPasswordHash } from "./bcrypt";
import { prisma } from "./prisma";
import { redis } from "./redis-store";
import { resend } from "./resend";

const REDIS_PREFIX = "otp";

// helper which issues a new 2fa challenge for user and sends them the code
// if there is already an outstanding challenge, it just resends same code

export async function issueChallenge(userId: string, email: string) {
  const array = new Uint32Array(1);
  const code = (crypto.getRandomValues(array)[0] % 900000) + 100000;
  const hash = await bcryptPasswordHash(code.toString());
  const challenge = { codeHash: hash, email };

  await redis.setex(`${REDIS_PREFIX}:uid-${userId}`, 10 * 60, challenge);

  const { error } = await resend.emails.send({
    from: process.env.FROM_EMAIL_ADDRESS as string,
    to: email,
    subject: `Sign in to ${process.env.NEXT_PUBLIC_APP_URL}`,
    react: ChallengeEmail({ data: { code } }),
  });

  if (error) {
    console.log({ error });
    throw new Error(`Error sending email: ${error.name} - ${error.message}`);
  }
}

// check whether a user supplied challenge code is correct, and if so, update the session

interface Challenge {
  codeHash: string;
  email: string;
}
export async function completeChallenge(userId: string, code: string) {
  const challenge = await redis.get<Challenge>(`${REDIS_PREFIX}:uid-${userId}`);

  if (challenge) {
    const isCorrect = await bcryptPasswordCompare(code, challenge.codeHash);
    if (isCorrect) {
      const session = await prisma.session.findFirst({
        where: { userId, requires2FA: true },
      });

      if (session) {
        await prisma.session.updateMany({
          where: {
            sessionToken: session.sessionToken,
            userId,
          },
          data: {
            requires2FA: false,
          },
        });
        await redis.del(`${REDIS_PREFIX}:uid-${userId}`);

        return { success: true, message: "2FA enabled successfully" };
      }
      return {
        succcess: false,
        message: "Could not find the session for the user",
      };
    }
    return {
      succcess: false,
      message: "Incorrect verification code - please try again",
    };
  }
  return {
    succcess: false,
    message: "Challenge does not exist - please try again",
  };
}
