import { Popup } from '@/types';
import React, { useState } from 'react';

type PopupPreviewProps = {
  popupStyles?: Popup;
  setPopupStyles: (styles: Popup) => void;
};

const PopupPreview = ({ popupStyles, setPopupStyles }: PopupPreviewProps) => {
  const [rating, setRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);


  console.log('Popup Styles in PP', popupStyles);

  return (
    <div
      id="tap-popup"
      style={{
        width: '360px',
        backgroundColor: popupStyles?.backgroundColor || '#fff',
        color: popupStyles?.textColor || '#000',
        fontFamily: 'Inter, sans-serif',
        padding: '20px',
        borderRadius: `${popupStyles?.borderRadius}px`,
        position: 'fixed',
        bottom: '40px',
        right: '40px',
        zIndex: 9999,
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        border: `${popupStyles?.borderWidth}px solid ${popupStyles?.borderColor || '#ddd'}`,
        animation: isSubmitted
          ? 'fade-out 0.5s ease-in forwards'
          : `${popupStyles?.entryAnimation || 'fade-in'} 0.4s ease-out`,
        transition: 'all 0.5s ease',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div
          style={{
            fontWeight: 600,
            color: popupStyles?.titleColor,
            margin: 0,
            fontSize: `${popupStyles?.titleSize || '16'}px`,
          }}
        >
          {popupStyles?.title}
        </div>
        <button
          onClick={() => document.getElementById('tap-popup')?.remove()}
          style={{
            background: 'transparent',
            border: 'none',
            color: popupStyles?.textColor || '#000',
            fontSize: '20px',
            cursor: 'pointer',
            lineHeight: 1,
          }}
          aria-label="Close popup"
        >
          ×
        </button>
      </div>

      {/* Star Rating */}
      <div style={{ margin: '16px 0 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
          {[1, 2, 3, 4, 5].map((i) => {
            const emojis = ['😡', '😕', '😐', '🙂', '😍'];
            const labels = ['Terrible', 'Bad', 'Okay', 'Good', 'Excellent'];

            const isSelected = i === rating;

            return (
              <div
                key={i}
                onClick={() => setRating(i)}
                style={{
                  textAlign: 'center',
                  cursor: 'pointer',
                  userSelect: 'none',
                  color: isSelected ? '#f5a623' : '#ccc',
                  transition: 'transform 0.2s',
                  fontWeight: isSelected ? 'bold' : 'normal',
                }}
              >
                <div style={{ fontSize: '24px' }}>{emojis[i - 1]}</div>
                <div style={{ fontSize: '10px', marginTop: '4px', color: popupStyles?.textColor || '#666' }}>
                  {labels[i - 1]}
                </div>
              </div>
            );
          })}
        </div>
      </div>


      {/* Textarea */}
      {popupStyles?.showTextInput && (
        <textarea
          placeholder="Leave your comments..."
          style={{
            width: '100%',
            padding: '10px',
            marginTop: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            backgroundColor: 'rgba(240,240,240,0.6)',
            color: '#333',
            resize: 'vertical',
            height: '60px',
            fontSize: '14px',
            outline: 'none',
            fontFamily: 'inherit',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#888';
            e.target.style.backgroundColor = 'rgba(230,230,230,0.9)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#ccc';
            e.target.style.backgroundColor = 'rgba(240,240,240,0.6)';
          }}
        />
      )}

      {/* Submit Button */}
      <button
        disabled={rating === 0}
        onClick={() => {
          setIsSubmitted(true);
          setTimeout(() => {
            document.getElementById('tap-popup')?.remove();
          }, 500); // allow time for fade-out animation
        }}
        style={{
          marginTop: '14px',
          width: '100%',
          padding: '10px 16px',
          backgroundColor: popupStyles?.ctaBackgroundColor || '#000',
          color: popupStyles?.ctaTextColor || '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: rating === 0 ? 'not-allowed' : 'pointer',
          fontWeight: 600,
          fontSize: '14px',
          opacity: rating === 0 ? 0.6 : 1,
          transition: 'all 0.2s',
        }}
        onMouseOver={(e) => {
          if (rating !== 0) e.currentTarget.style.opacity = '0.9';
        }}
        onMouseOut={(e) => {
          if (rating !== 0) e.currentTarget.style.opacity = '1';
        }}
      >
        {popupStyles?.ctaText || 'Submit'}
      </button>

    </div>
  );
};

export default PopupPreview;
