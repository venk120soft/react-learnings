// https://github.com/boxdox/hex2rgb/blob/7fc1a945ebad67060420326417a8731b69753686/app.js#L66
// https://boxdox.github.io/hex2rgb/
import { Callout, ColorPicker, getColorFromString, IColor, ITextFieldProps } from '@fluentui/react';
import * as React from 'react';
import { i18n } from 'common/localization';

import { ApTextBox } from '../text-field';
import { colorPaletteCells } from './color-constants';
import * as styles from './color-picker.scss';

interface IColorPallete {
  id: string;
  label: string;
  color: string;
}

export interface IApColorPickerProps extends ITextFieldProps {
  colorObj: IColor;
  colorChangeHandler: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
                       newColor?: string | IColor, isValid?: boolean) => void;
}

export interface IApColorPickerState {
  color: IColor;
  isPickerOpen: boolean;
  isValidColor: boolean;
}

export class ApColorPicker extends React.Component<IApColorPickerProps, IApColorPickerState> {
  private defaultColor: string = '#000000';
  constructor(props: IApColorPickerProps) {
    super(props);
    const color: IColor = props.colorObj instanceof Object ? props.colorObj : getColorFromString(this.defaultColor);
    this.state = {
      color,
      isPickerOpen: false,
      isValidColor: true,
    };
  }

  public render() {
    const { color, isPickerOpen } = this.state;
    return (
      <div className={styles.mainContainer}>
        <div className={styles.colorCodesContainer}>
          <div className={styles.hexContainer}>
            {isPickerOpen &&
              (
                <Callout
                  role='alertdialog'
                  gapSpace={0}
                  target={`.${styles.callOutArea}`}
                  isBeakVisible={false}
                  onDismiss={this.onDismiss}
                >
                  <ColorPicker
                    className={styles.colorPickerStyles}
                    alphaType={'none'}
                    color={color}
                    onChange={this.updateColor}
                    alphaSliderHidden={true}
                    strings={{
                      hueAriaLabel: i18n('Mgmt.ColorPicker.Common.ColorPicker.HueAriaLabel'),
                    }}
                  />
                </Callout>
              )
            }
            <ApTextBox
              label={i18n('Mgmt.ColorPicker.Common.Color.Label.HexCode')}
              value={color.str.toLowerCase()}
              className={styles.textHexColor}
              onChange={this.onChangeHex}
              onRenderPrefix={this.renderHexColorPrefix}
              maxLength={7}
              underlined
            />
          </div>
          <div className={styles.remainContainer}>
            <ApTextBox
              label={i18n('Mgmt.ColorPicker.Common.Color.Label.Red')}
              value={color.r.toString()}
              className={styles.textRemainColor}
              onChange={this.onChangeRed}
              maxLength={3}
            />
            <ApTextBox
              label={i18n('Mgmt.ColorPicker.Common.Color.Label.Green')}
              value={color.g.toString()}
              className={styles.textRemainColor}
              onChange={this.onChangeGreen}
              maxLength={3}
            />
            <ApTextBox
              label={i18n('Mgmt.ColorPicker.Common.Color.Label.Blue')}
              value={color.b.toString()}
              className={styles.textRemainColor}
              onChange={this.onChangeBlue}
              maxLength={3}
            />
          </div>
        </div>
        {!this.state.isValidColor && <span className={styles.errorMsg}>{i18n('Mgmt.ColorPicker.Common.Color.Error')}</span>}
        <div className={styles.palettesContainer}>
          {colorPaletteCells.map((x: IColorPallete) => {
            return (
              <div key={x.id} id={x.id} aria-label={x.label} className={styles.colorPaletteBox} style={{ backgroundColor: x.color }}
                onClick={this.onColorPaletteCellClick}
              />
            );
          })}
        </div>
        {isPickerOpen && <div className={styles.callOutArea} />}
      </div>
    );
  }

  private renderHexColorPrefix = () => (
    <div className={styles.colorBox} style={{ backgroundColor: this.state.color.str }}
      onClick={this.onPrefixColorPaletteClick} />
  );

  private onPrefixColorPaletteClick = (_event: any) => {
    this.setState({ isPickerOpen: true });
  }

  private onDismiss = () => {
    if (this.state.isPickerOpen)
      this.setState({ isPickerOpen: false });
  }

  private onColorPaletteCellClick = (event: any) => {
    const colorObj = colorPaletteCells.find((x: IColorPallete) => x.id === event.target.id);
    const colorHex = colorObj ? colorObj.color : this.defaultColor;
    this.setState({ color: getColorFromString(colorHex), isPickerOpen: false, isValidColor: true });
    this.props.colorChangeHandler(event, getColorFromString(colorHex), true);
  }

  private onChangeRed = (e: any) => {
    this.colorChangeHandler(e, e.target.value as number);
  }

  private onChangeGreen = (e: any) => {
    this.colorChangeHandler(e, 0, e.target.value as number);
  }

  private onChangeBlue = (e: any) => {
    this.colorChangeHandler(e, 0, 0, e.target.value as number);
  }

  private onChangeHex = (e: any) => {
    const { color } = this.state;
    const hex = e.target.value as string;
    const pattern = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
    const rgbValue = pattern.test(hex) ? this.hexToRgb(hex).split('rgb(')[1].split(')')[0].split(',') : '';
    let colorObj: IColor = color;
    if (rgbValue.length === 3) {
      colorObj = {
        ...color,
        r: Number(rgbValue[0]),
        g: Number(rgbValue[1]),
        b: Number(rgbValue[2]),
      };
    }
    colorObj = {
      ...colorObj,
      hex: hex.indexOf('#') === 0 ? hex.split('#')[1] : hex,
      str: (hex.indexOf('#') === 0 ? hex : '#' + hex).toUpperCase(),
    };
    this.updateColor(e, colorObj, pattern.test(hex));
  }

  // Converting rgb color to hex: Ex: 'ffffff'
  private rgbToHex = (rgb: string) => !rgb.match(/\d+/g) ? false :
    rgb.match(/\d+/g).map((x: string) => parseInt(x, 10).toString(16).padStart(2, '0')).join('');

  // Converting hex to rgb: Ex: rgb(160,164,184)
  private hexToRgb = (hex: string) => {
    const x: number[] = [];
    hex = hex.replace('#', '');
    if (hex.length !== 6) {
      hex = this.modifyHex(hex);
    }
    x.push(parseInt(hex.slice(0, 2), 16));
    x.push(parseInt(hex.slice(2, 4), 16));
    x.push(parseInt(hex.slice(4, 6), 16));
    return 'rgb(' + x.toString() + ')';
  }

  // Convert into 6 digit hexa decimal
  private modifyHex = (hex: string) => {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      hex = hex.split('').map((x: string) => x + x).join('');
    }
    return hex;
  }

  private colorChangeHandler = (event: any, r: number = 0, g: number = 0, b: number = 0) => {
    const { color } = this.state;
    const pattern = /(^\d[0-9]{0,2}$)/;
    const isValid = (x: any) => pattern.test(x) && x !== 0 && x <= 255;
    let colorObj: IColor = {
      ...color,
      r: isValid(r) ? Number(r) : color.r,
      g: isValid(g) ? Number(g) : color.g,
      b: isValid(b) ? Number(b) : color.b,
    };
    const hexColor = this.rgbToHex('rgb(' + [colorObj.r, colorObj.g, colorObj.b].join() + ')');
    colorObj = {
      ...colorObj,
      hex: hexColor || color.hex,
      str: hexColor ? '#' + hexColor.toUpperCase() : color.str,
    };
    this.updateColor(event, colorObj);
  }

  private updateColor = (e: any, colorObj: IColor, isValidColor: boolean = true) => {
    this.setState({ color: colorObj, isValidColor });
    this.props.colorChangeHandler(e, colorObj, isValidColor);
  };
}
