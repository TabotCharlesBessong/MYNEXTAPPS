import {
  Body,
  Column,
  Container,
  Font,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
} from "@react-email/components";
import type { PropsWithChildren } from "react";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_APP_URL;

const twConfig = {};

interface EmailLayoutProps extends PropsWithChildren {
  preview: string;
}

const EmailLayout = ({ children, preview = "" }: EmailLayoutProps) => {
  return (
    <Html>
      <Tailwind config={twConfig}>
        <Head>
          <Font fontFamily="Roboto" fallbackFontFamily="Verdana" />
          <meta name="color-scheme" content="light-only" />
          <meta name="supported-color-schemes" content="light-only" />
        </Head>
        <Preview>{preview}</Preview>
        <Body
          style={{
            backgroundColor: "#f4f4f4",
            fontFamily:
              "-apple-system, BlinkMaxSystemFont, 'Roboto', sans-serif",
            margin: "0 auto",
            padding: "16px 16px 0 16px",
          }}
        >
          <Container style={{ margin: "0 auto" }}>
            <Container
              style={{ backgroundColor: "#fff" }}
              className="rounded-lg p-4 2xl:p-6 mb-4 2xl:mb-6"
            >
              <Section>
                <Row>
                  <Column align="center">
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      href={baseUrl}
                    >
                      <Img
                        alt="logo"
                        src={`${baseUrl}/static/logo.svg`}
                        className="h-full w-[200px]"
                      />
                    </Link>
                  </Column>
                </Row>
              </Section>
            </Container>
            <Container
              style={{ backgroundColor: "#fff" }}
              className="rounded-lg p-4 2xl:p-6 mb-4 2xl:mb-6"
            >
              {children}
            </Container>
            <Container
              style={{ backgroundColor: "#fff" }}
              className="rounded-lg p-4 2xl:p-6 mb-4 2xl:mb-6"
            >
              <Section>
                <Row>
                  <Column className="flex items-center" align="left">
                    <Img
                      className="w-16 h-16"
                      src={`${baseUrl}/static/logo-mob.svg`}
                    />
                  </Column>

                  <Column align="right">
                    <address className="not-italic text-right text-xs">
                      <span className="text-gray-800">Majestic Motors</span>
                      <br />1 Hacker Way, <br />
                      United Kingdom, W1 1AB <br />
                      <Link
                        className="text-blue-600 underline"
                        href={"mailto:hello@majesticmotors.com"}
                      >
                        hello@majesticmotors.com
                      </Link>
                    </address>
                  </Column>
                </Row>
              </Section>
            </Container>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailLayout;
