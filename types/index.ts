export interface Popup {
    id: string;
    projectId: string;
    title?: string;
    titleSize?: string;
    titleColor?: string;
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
    delay?: number;
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