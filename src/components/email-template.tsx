import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
}) => (
  <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.5" }}>
    <h1>📬 Nova mensagem do formulário de contato!</h1>
    <p>
      👤 <strong>Nome:</strong> {name}
    </p>
    <p>
      📧 <strong>Email:</strong> {email}
    </p>
    <p>
      📝 <strong>Mensagem:</strong>
    </p>
    <blockquote
      style={{
        backgroundColor: "#f9f9f9",
        padding: "10px",
        borderLeft: "4px solid #ccc",
      }}
    >
      {message}
    </blockquote>
  </div>
);
