'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PopupPreview from '../common/PopupPreview';
import { Popup } from '@/types';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from '../ui/button';
import { Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { ColorPicker } from '../common/ColorPicker';
import TitleSettings from '../apperarance/TitleSettings';
import DescriptionSettings from '../apperarance/DescriptionSettings';
import DisplaySettings from '../apperarance/DisplaySettings';
import CtaSettings from '../apperarance/CtaSettings';
import BehaviorAnimationSettings from '../apperarance/BehaviorAnimationSettings';

interface AppearanceProps {
  popupId: string;
}

const Appearance = ({ popupId }: AppearanceProps) => {
  const [showPopupPreview, setShowPopupPreview] = useState(true);
  const [initialStyles, setInitialStyles] = useState<Popup | undefined>();

  const [popupStyles, setPopupStyles] = useState<Popup | undefined>();
  const [styleChanged, setStyleChanged] = useState(false);

  useEffect(() => {
    const getPopupStyles = async () => {
      const res = await axios.post('/api/popup/get-popup', { popupId });
      if (res.status === 200) {
        setPopupStyles(res.data.popup);
        setInitialStyles(res.data.popup);
      }
    };
    getPopupStyles();
  }, [popupId]);

  useEffect(() => {
    if (!popupStyles || !initialStyles) return;

    const hasChanged = Object.entries(popupStyles).some(
      ([key, value]) => initialStyles[key as keyof Popup] !== value
    );

    setStyleChanged(hasChanged);
  }, [popupStyles, initialStyles]);


  const updatePopup = async () => {
    if (!popupStyles || !initialStyles) return;

    const changedFields = Object.entries(popupStyles).reduce((acc, [key, value]) => {
      if (initialStyles[key as keyof Popup] !== value) {
        // @ts-ignore - TODO
        acc[key] = value;
      }
      return acc;
    }, {} as Partial<Popup>);

    const res = await axios.put('/api/popup/update-popup', {
      popupId,
      ...changedFields,
    });

    if (res.status === 200) {
      toast.success('Popup updated successfully!');
      setInitialStyles(popupStyles);
      setStyleChanged(false);
    }
  }

  const handleDiscardChanges = () => {
    if (popupStyles && initialStyles) {
      setPopupStyles(initialStyles);
      setStyleChanged(false);
    }
    toast.error('Changes discarded!');
  }

  return (
    <div className="px-8 py-4 space-y-8">
      <div className='flex justify-between items-center'>
        <div className="flex flex-col">
          <div className='flex items-center gap-4'>
            <div className="text-2xl font-semibold">Appearance</div>
            {styleChanged && (
              <p className="text-xs text-red-500 font-medium">(You have unsaved changes!)</p>
            )}
          </div>
          <p className="text-muted-foreground text-sm">Customize your widget's appearance here.</p>
        </div>

        {
          styleChanged && (
            <div className="flex gap-4">
              <Button
                variant="secondary"
                onClick={updatePopup}
                className="bg-primary hover:bg-primary/80 text-white cursor-pointer"
              >
                Save Changes
              </Button>
              <Button variant={'outline'} onClick={handleDiscardChanges}>
                Discard Changes
              </Button>
            </div>
          )
        }

      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Title Settings */}
        <TitleSettings popupStyles={popupStyles} setPopupStyles={setPopupStyles} />

        {/* Description Settings */}
        <DescriptionSettings popupStyles={popupStyles} setPopupStyles={setPopupStyles} />

        {/* Display Settings */}
        <DisplaySettings popupStyles={popupStyles} setPopupStyles={setPopupStyles} />

        {/* CTA Settings */}
        <CtaSettings popupStyles={popupStyles} setPopupStyles={setPopupStyles} />

        {/* Misc Settings */}
        <BehaviorAnimationSettings popupStyles={popupStyles} setPopupStyles={setPopupStyles} setShowPopupPreview={setShowPopupPreview}/>
      </div>

      {showPopupPreview && popupStyles && (
        <div className="mt-6">
          <PopupPreview popupStyles={popupStyles} setPopupStyles={setPopupStyles} />
        </div>
      )}
    </div>
  );
};

export default Appearance;
