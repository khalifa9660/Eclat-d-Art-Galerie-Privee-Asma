
export interface Painting {
  id: string;
  title: string;
  description: string;
  price: string;
  dimensions: string;
  category: 'Abstrait' | 'Paysage' | 'Portrait' | 'Moderne';
  imageUrl: string;
  sold?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
