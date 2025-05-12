import React from 'react'
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { ColorPicker } from '../common/ColorPicker';
import { Button } from '../ui/button';
import { Minus, Plus } from 'lucide-react';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface BehaviorAnimationSettingsProps {
  popupStyles: any
  setPopupStyles: (styles: any) => void;
  setShowPopupPreview: (show: boolean) => void;
}

const BehaviorAnimationSettings = ({ popupStyles, setPopupStyles, setShowPopupPreview }: BehaviorAnimationSettingsProps) => {
  return (
    <Card className="p-4">
      <div>
        <h3 className="font-medium"> Behavior & Animation</h3>
        <p className="text-muted-foreground text-xs">Customise Behavior & Animation</p>
      </div>
      <Separator />
      <div className='flex justify-between items-start gap-4'>
        <div className="flex flex-col gap-2 w-full">
          <Label>Show Text Input</Label>
          <Switch
            checked={popupStyles?.showTextInput || false}
            onCheckedChange={(checked) => setPopupStyles({ ...popupStyles!, showTextInput: checked })}
          />
        </div>

        <div className="space-y-2 w-full">
          <Label>Popup Position</Label>
          <Select value={popupStyles?.position} onValueChange={(value) => {
            setShowPopupPreview(false);
            setPopupStyles({ ...popupStyles!, position: value });
            setTimeout(() => setShowPopupPreview(true), 100);
          }}>
            <SelectTrigger className='w-full'><SelectValue placeholder="Select position" /></SelectTrigger>
            <SelectContent className='w-full'>
              <SelectItem value="top-right">Top Right</SelectItem>
              <SelectItem value="top-left">Top Left</SelectItem>
              <SelectItem value="bottom-right">Bottom Right</SelectItem>
              <SelectItem value="bottom-left">Bottom Left</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 w-full">
          <Label>Animation</Label>
          <Select
            value={popupStyles?.entryAnimation}
            onValueChange={(value) => {
              setShowPopupPreview(false);
              setPopupStyles({ ...popupStyles!, entryAnimation: value });
              setTimeout(() => setShowPopupPreview(true), 100);
            }}
          >
            <SelectTrigger className='w-full'><SelectValue placeholder="Select animation" /></SelectTrigger>
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
    </Card>
  )
}

export default BehaviorAnimationSettings