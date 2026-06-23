import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  username?: string;
  dashboardLink?: string;
}

const fontFamily =
  "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif";

export default function WelcomeEmail({
  username,
  dashboardLink = "http://localhost:5000",
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Bienvenido a ARS</Preview>

      <Body style={{ backgroundColor: "#f5f7fa" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "40px",
            borderRadius: "12px",
            maxWidth: "600px",
            margin: "0 auto",
            border: "1px solid #e5e7eb",
            fontFamily,
          }}
        >
          <Section style={{ textAlign: "center", marginBottom: "20px" }}>
            <Img
              src="https://github.com/jerryOriginE/ARS-Website/blob/main/logo512.png?raw=true"
              width="180"
              alt="ARS"
              style={{ display: "block", margin: "0 auto" }}
            />
          </Section>

          <Heading style={{ textAlign: "center", color: "#2F3A1F" }}>
            ¡Bienvenido a ARS!
          </Heading>

          <Text style={{ color: "#374151", fontSize: "16px" }}>
            {username ? `Hola ${username},` : "Hola,"} gracias por unirte a ARS.
            Estamos emocionados de tenerte con nosotros.
          </Text>

          <Text style={{ color: "#374151", fontSize: "14px" }}>
            Ya puedes comenzar a explorar tu cuenta y todas las herramientas disponibles.
          </Text>

          <Section style={{ textAlign: "center", margin: "30px 0" }}>
            <Button
              href={dashboardLink}
              style={{
                backgroundColor: "#6E9B2D",
                color: "#ffffff",
                padding: "14px 24px",
                borderRadius: "8px",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Ir al panel
            </Button>
          </Section>

          <Section style={{ marginTop: "30px", fontSize: "13px", color: "#6b7280" }}>
            <Text style={{ margin: "4px 0" }}>
              Soporte: <b>soporte-ars@balamserver.top</b>
            </Text>
            <Text style={{ margin: "4px 0" }}>
              Sitio web: <b>ars.balamserver.top</b>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}