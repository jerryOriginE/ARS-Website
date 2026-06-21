// emails/VerifyEmail.tsx

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

interface VerifyEmailProps {
  verificationLink: string;
  username?: string;
}
const fontFamily =
  "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif";
export default function VerifyEmail({
  verificationLink="localhost:5000",
  username,
}: VerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verifica tu cuenta de ARS</Preview>

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
              style={{ display: 'block', margin: '0 auto' }}
            />
          </Section>

          <Heading style={{ textAlign: "center", color: "#2F3A1F" }}>
            Bienvenido a ARS
          </Heading>

          <Text style={{ color: "#374151", fontSize: "16px" }}>
            {username ? `Hola ${username},` : "Hola,"} gracias por crear tu cuenta.
            Por favor verifica tu correo electrónico para continuar.
          </Text>

          <Text style={{ color: "#374151", fontSize: "14px" }}>
            ⚠️ Este enlace de verificación expirará en <b>24 horas</b>.
          </Text>

          <Section style={{ textAlign: "center", margin: "30px 0" }}>
            <Button
              href={verificationLink}
              style={{
                backgroundColor: "#6E9B2D",
                color: "#ffffff",
                padding: "14px 24px",
                borderRadius: "8px",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Verificar correo electrónico
            </Button>
          </Section>

          <Text style={{ color: "#6b7280", marginTop: "20px" }}>
            Si el botón no funciona, copia y pega este enlace:
          </Text>

          <Text
            style={{
              color: "#374151",
              wordBreak: "break-all",
              fontSize: "13px",
              backgroundColor: "#f9fafb",
              padding: "10px",
              borderRadius: "6px",
            }}
          >
            {verificationLink}
          </Text>

          <Section style={{ marginTop: "30px", fontSize: "13px", color: "#6b7280" }}>
            <Text style={{ margin: "4px 0" }}>
              Recopilamos tu <b>nombre de usuario</b> (no tu nombre) para la identificación de la cuenta.
              </Text>
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