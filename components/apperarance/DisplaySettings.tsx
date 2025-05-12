import React from 'react'
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import { ColorPicker } from '../common/ColorPicker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Minus, Plus } from 'lucide-react';
import { Input } from '../ui/input';
import { Slider } from '../ui/slider';


interface DisplaySettingsProps {
    popupStyles: any;
    setPopupStyles: (styles: any) => void;
}


const DisplaySettings = ({ popupStyles, setPopupStyles }: DisplaySettingsProps) => {

    console.log('popupStyles', popupStyles)
    return (
        <Card className="p-4">
            <div>
                <h3 className="font-medium">Display Settings</h3>
                <p className="text-muted-foreground text-xs">Customize the background and position of your widget.</p>
            </div>
            <Separator />
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Background Color</Label>
                    <ColorPicker
                        value={popupStyles?.backgroundColor || '#ffffff'}
                        onChange={(newColor) =>
                            setPopupStyles({ ...popupStyles!, backgroundColor: newColor })
                        }
                    />
                </div>

                <div className='flex justify-between items-center gap-4'>

                    <div className="flex flex-col gap-2">
                        <Label>Border Radius</Label>
                        <div className="flex gap-1 items-center">
                            <Slider
                                value={[parseInt(popupStyles?.borderRadius || '16')]}
                                min={0}
                                max={50}
                                step={5}
                                onValueChange={([val]) => {
                                    setPopupStyles({ ...popupStyles!, borderRadius: `${val}` });
                                }}
                                className="w-32"
                            />
                            <span className="text-sm">{popupStyles?.borderRadius || '16'}px</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Border Width</Label>
                        <div className="flex gap-1 items-center">
                            <Slider
                                value={[parseInt(popupStyles?.borderWidth || '16')]}
                                min={0}
                                max={40}
                                step={1}
                                onValueChange={([val]) => {
                                    setPopupStyles({ ...popupStyles!, borderWidth: `${val}` });
                                }}
                                className="w-32"
                            />
                            <span className="text-sm">{popupStyles?.borderWidth || '16'}px</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Border Color</Label>
                        <ColorPicker
                            value={popupStyles?.borderColor || '#ffffff'}
                            onChange={(newColor) =>
                                setPopupStyles({ ...popupStyles!, borderColor: newColor })
                            }
                        />
                    </div>

                </div>
                {/* <div className='flex justify-between'>
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
                </div> */}
            </div>
        </Card>)
}

export default DisplaySettings