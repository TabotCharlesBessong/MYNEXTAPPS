import { db } from "./server/db";

await db.user.create({
  data: {
    emailAddress: "me@gmail.com",
    firstName: "Hello",
    lastName: "Hi",
    imageUrl: "How are you doing",
  },
});