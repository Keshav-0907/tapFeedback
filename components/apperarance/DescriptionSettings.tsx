import React from 'react'
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { ColorPicker } from '../common/ColorPicker';
import { Button } from '../ui/button';
import { Minus, Plus } from 'lucide-react';
import { Slider } from '../ui/slider';

interface TitleSettingsProps {
  popupStyles: any,
  setPopupStyles: React.Dispatch<React.SetStateAction<any>>;
}
const DescriptionSettings = ({ popupStyles, setPopupStyles }:TitleSettingsProps) => {
  return (
    <Card className="p-4">
      <div>
        <h3 className="font-medium">Description Settings</h3>
        <p className="text-muted-foreground text-xs">Customize the Description of your widget.</p>
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Description Text</Label>
          <Input value={popupStyles?.description || ''} onChange={(e) => setPopupStyles({ ...popupStyles!, description: e.target.value })} />
        </div>
        <div className="flex gap-4 justify-between items-center">
          <div className="flex flex-col gap-2">
            <Label>Description Color</Label>
            <ColorPicker
              value={popupStyles?.descriptionColor || '#000000'}
              onChange={(newColor) =>
                setPopupStyles({ ...popupStyles!, descriptionColor: newColor })
              }
            />

          </div>
          <div className="flex flex-col gap-2">
            <Label>Title Size</Label>
            <div className="flex gap-1 items-center">
              <Slider
                value={[parseInt(popupStyles?.descriptionSize || '16')]}
                min={4}
                max={30}
                step={1}
                onValueChange={([val]) => {
                  setPopupStyles({ ...popupStyles!, descriptionSize: `${val}` });
                }}
                className="w-32"
              />
              <span className="text-sm">{popupStyles?.descriptionSize || '16'}px</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default DescriptionSettings