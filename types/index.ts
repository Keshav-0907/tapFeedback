export interface Popup {
  id: string;
  projectId: string;
  title?: string;
  titleSize?: string;
  titleColor?: string;
  description?: string;
  descriptionSize?: string;
  descriptionColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: string;
  borderRadius?: string;
  feedbackType?: string;
  showTextInput?: boolean;
  ctaText?: string;
  ctaTextColor?: string;
  ctaBackgroundColor?: string;
  position?: string;
  entryAnimation?: string;
  exitAnimation?: string;
  createdAt: Date;
  updatedAt: Date;
}

  
  export interface User {
    id?: string;
    name: string;
    email: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }