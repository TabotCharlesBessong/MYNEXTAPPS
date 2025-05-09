import { Container, Heading, Section, Text } from "@react-email/components";
import EmailLayout from "./layout";
const PropDefaults = {
  code: 123456,
};

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_APP_URL;

const ChallengeEmail = ({ data = PropDefaults }) => {
  return (
    <EmailLayout
      preview={`Sign in to your account by entering ${data.code} in the sign-in form`}
    >
      <Container className="py-4">
        <Section className="mb-4 max-w-lg flex flex-col items-center">
          <Heading className="text-3xl mt-0 font-semibold text-center">
            Sign in to {baseUrl}
          </Heading>
        </Section>
        <Section className="flex items-center justify-center bg-gray-200 p-6 rounded">
          <div className="text-center">
            <Text className="font-bold m-0">Verification Code</Text>
            <Text className="font-bold text-3xl my-2.5 mx-0 tracking-widest">
              {data.code}
            </Text>
            <Text className="m-0">(This code is valid for 10 minutes)</Text>
          </div>
        </Section>
        <Section>
          <Text className="text-secondary text-center text-lg">
            If you did not request this email you can safely ignore it
          </Text>
        </Section>
      </Container>
    </EmailLayout>
  );
};

export default ChallengeEmail;
