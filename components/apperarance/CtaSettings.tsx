import React from 'react'
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { ColorPicker } from '../common/ColorPicker';
import { Button } from '../ui/button';
import { Minus, Plus } from 'lucide-react';

interface CTASettingsProps {
  popupStyles: any,
  setPopupStyles: React.Dispatch<React.SetStateAction<any>>;
}


const CtaSettings = ({ popupStyles, setPopupStyles }: CTASettingsProps) => {
  return (
    <Card className="p-4">
      <div>
        <h3 className="font-medium">CTA Settings</h3>
        <p className="text-muted-foreground text-xs">Customize the CTA of your widget.</p>
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
            <ColorPicker
              value={popupStyles?.ctaTextColor || '#000000'}
              onChange={(newColor) =>
                setPopupStyles({ ...popupStyles!, ctaTextColor: newColor })
              }
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label>CTA Background Color</Label>
            <ColorPicker
              value={popupStyles?.ctaBackgroundColor || '#000000'}
              onChange={(newColor) =>
                setPopupStyles({ ...popupStyles!, ctaBackgroundColor: newColor })
              }
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default CtaSettings