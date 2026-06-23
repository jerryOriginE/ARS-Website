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

interface ResetPasswordEmailProps {
  resetLink: string;
  username?: string;
}

const fontFamily =
  "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif";

export default function ResetPasswordEmail({
  resetLink,
  username,
}: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Restablece tu contraseña de ARS</Preview>

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
            Restablecer contraseña
          </Heading>

          <Text style={{ color: "#374151", fontSize: "16px" }}>
            {username ? `Hola ${username},` : "Hola,"} recibimos una solicitud para
            restablecer tu contraseña.
          </Text>

          <Text style={{ color: "#374151", fontSize: "14px" }}>
            ⚠️ Este enlace expirará en <b>1 hora</b> por seguridad.
          </Text>

          <Section style={{ textAlign: "center", margin: "30px 0" }}>
            <Button
              href={resetLink}
              style={{
                backgroundColor: "#6E9B2D",
                color: "#ffffff",
                padding: "14px 24px",
                borderRadius: "8px",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Restablecer contraseña
            </Button>
          </Section>

          <Text style={{ color: "#6b7280", marginTop: "20px" }}>
            Si no solicitaste este cambio, favor de ponerse en contacto con nuestro equipo de soporte.
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
            {resetLink}
          </Text>

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