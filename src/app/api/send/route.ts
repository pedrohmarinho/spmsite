import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EmailTemplate } from '@/components/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nameForm, emailForm, messageForm } = body;

    if (!nameForm || !emailForm || !messageForm) {
      return NextResponse.json(
        { error: 'Campos obrigatórios faltando' },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: 'SPM Contact Form <onboarding@resend.dev>',
      to: [process.env.EMAIL_TO_SEND as string],
      subject: 'Nova mensagem do formulário de contato',
      react: EmailTemplate({ name: nameForm, email: emailForm, message: messageForm }),
    });

    if (error) {
      console.error('Erro ao enviar e-mail:', error);
      return NextResponse.json(
        { error: 'Falha ao enviar e-mail' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'E-mail enviado com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro no servidor:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}