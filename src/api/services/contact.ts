import { fetchApi } from '../config';

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  message: string;
  contact: {
    name: string;
    email: string;
    subject: string;
    message: string;
    status: string;
    ip_address: string;
    user_agent: string;
    created_at: string;
    updated_at: string;
  };
}

export const ContactService = {
  // Mesaj gönder
  sendMessage: async (data: ContactForm) => {
    const response = await fetchApi<ContactResponse>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  },
}; 