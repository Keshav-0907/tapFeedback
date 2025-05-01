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
        acc[key] = value;
      }
      return acc;
    }, {} as Partial<Popup>);

    const res = await axios.put('/api/popup/update-popup', {
      popupId,
      ...changedFields,
    });

    if (res.status === 200) {
      alert('Popup styles updated successfully!');
      setInitialStyles(popupStyles);
      setStyleChanged(false);
    }
  }

  return (
    <div className="p-6 text-white">
      <div className='flex justify-between items-center'>
        <div className="flex flex-col gap-1 mb-6">
          <h2 className="text-2xl font-semibold">Appearance</h2>
          <p className="text-muted-foreground">Customize your widget's appearance here.</p>
        </div>

        <Button
          disabled={!styleChanged}
          onClick={updatePopup}
        >
          Save Changes
        </Button>

      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Title Settings */}
        <Card className="p-4 space-y-4">
          <div>
            <h3 className="font-medium">Title Settings</h3>
            <p className="text-muted-foreground text-sm">Customize the title of your widget.</p>
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title Text</Label>
              <Input value={popupStyles?.title || ''} onChange={(e) => setPopupStyles({ ...popupStyles!, title: e.target.value })} />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <Label>Title Color</Label>
                <Input value={popupStyles?.titleColor || ''} onChange={(e) => setPopupStyles({ ...popupStyles!, titleColor: e.target.value })} />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Title Size</Label>
                <div className="flex gap-2 items-center">
                  <Button onClick={() => {
                    const size = Math.max((parseInt(popupStyles?.titleSize || '16') || 16) - 1, 10);
                    setPopupStyles({ ...popupStyles!, titleSize: `${size}` });
                  }}>
                    <Minus />
                  </Button>
                  <Input
                    readOnly
                    className="w-20"
                    value={`${popupStyles?.titleSize || '16'}px`}
                    onChange={(e) => {
                      const size = parseInt(e.target.value.replace('px', ''));
                      if (!isNaN(size)) setPopupStyles({ ...popupStyles!, titleSize: `${size}` });
                    }}
                  />
                  <Button onClick={() => {
                    const size = Math.min((parseInt(popupStyles?.titleSize || '16') || 16) + 1, 50);
                    setPopupStyles({ ...popupStyles!, titleSize: `${size}` });
                  }}>
                    <Plus />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Display Settings */}
        <Card className="p-4 space-y-4">
          <div>
            <h3 className="font-medium">Display Settings</h3>
            <p className="text-muted-foreground text-sm">Customize the background and position of your widget.</p>
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Background Color</Label>
              <Input value={popupStyles?.backgroundColor || ''} onChange={(e) => setPopupStyles({ ...popupStyles!, backgroundColor: e.target.value })} />
            </div>
            <div className='flex justify-between'>
              <div className="space-y-2">
                <Label>Popup Position</Label>
                <Select disabled={true}>
                  <SelectTrigger><SelectValue placeholder="Select position" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top-right">Top Right</SelectItem>
                    <SelectItem value="top-left">Top Left</SelectItem>
                    <SelectItem value="bottom-right">Bottom Right</SelectItem>
                    <SelectItem value="bottom-left">Bottom Left</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Animation</Label>
                <Select
                  onValueChange={(value) => {
                    setShowPopupPreview(false);
                    setPopupStyles({ ...popupStyles!, entryAnimation: value });
                    setTimeout(() => setShowPopupPreview(true), 100);
                  }}
                >
                  <SelectTrigger><SelectValue placeholder="Select animation" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fade-in">Fade In</SelectItem>
                    <SelectItem value="slide-in-left">Slide In Left</SelectItem>
                    <SelectItem value="slide-in-right">Slide In Right</SelectItem>
                    <SelectItem value="zoom-in">Zoom In</SelectItem>
                    <SelectItem value="bounce-in">Bounce In</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA Settings */}
        <Card className="p-4 space-y-4">
          <div>
            <h3 className="font-medium">CTA Settings</h3>
            <p className="text-muted-foreground text-sm">Customize the CTA of your widget.</p>
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>CTA Text</Label>
              <Input value={popupStyles?.ctaText || ''} onChange={(e) => setPopupStyles({ ...popupStyles!, ctaText: e.target.value })} />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 w-full">
                <Label>CTA Text Color</Label>
                <Input value={popupStyles?.ctaTextColor || ''} onChange={(e) => setPopupStyles({ ...popupStyles!, ctaTextColor: e.target.value })} />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label>CTA Background Color</Label>
                <Input value={popupStyles?.ctaBackgroundColor || ''} onChange={(e) => setPopupStyles({ ...popupStyles!, ctaBackgroundColor: e.target.value })} />
              </div>
            </div>
          </div>
        </Card>

        {/* Misc Settings */}
        <Card className="p-4 space-y-4">
          <div>
            <h3 className="font-medium">Miscellaneous</h3>
            <p className="text-muted-foreground text-sm">Additional popup behavior options.</p>
          </div>
          <Separator />
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <Label>Show Text Input</Label>
              <Switch
                checked={popupStyles?.showTextInput || false}
                onCheckedChange={(checked) => setPopupStyles({ ...popupStyles!, showTextInput: checked })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Delay to open popup (ms)</Label>
              <Input
                disabled={true}
                value={popupStyles?.delay?.toString() || ''}
                onChange={(e) => setPopupStyles({ ...popupStyles!, delay: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
        </Card>

        {/* Border Settings */}
        <Card className="p-4 space-y-4">
          <div>
            <h3 className="font-medium">Border Settings</h3>
            <p className="text-muted-foreground text-sm">Customize the border appearance of your widget.</p>
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Border Width</Label>
              <Input value={popupStyles?.borderWidth || ''} onChange={(e) => setPopupStyles({ ...popupStyles!, borderWidth: e.target.value })} />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <Label>Border Color</Label>
                <Input value={popupStyles?.borderColor || ''} onChange={(e) => setPopupStyles({ ...popupStyles!, borderColor: e.target.value })} />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Border Radius</Label>
                <Input
                  className="w-20"
                  value={`${popupStyles?.borderRadius || '0'}px`}
                  onChange={(e) => {
                    const val = parseInt(e.target.value.replace('px', ''));
                    if (!isNaN(val)) setPopupStyles({ ...popupStyles!, borderRadius: `${val}` });
                  }}
                />
              </div>
            </div>
          </div>
        </Card>
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
