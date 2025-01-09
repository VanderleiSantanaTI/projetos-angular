import { NgClass, NgStyle } from "@angular/common";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-button",
  standalone: true,
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
  imports: [NgClass, NgStyle, IonicModule],
})
export class ButtonComponent {
  @Output() action = new EventEmitter<void>();

  @Input() text: string = "";
  @Input() type: "primary" | "outline" | "secondary" | "error" | "success" = "primary";
  @Input() textUpper: boolean = false;
  @Input() fontBold: boolean = false;
  @Input() active: boolean = false;

  @Input() width: string = "";
  @Input() height: string = "";

  @Input() disabled: boolean = false;
  @Input() showSpinner: boolean = false;

  @Input() icon: string = "";
  @Input() alignIcon: "left" | "right" = "left";
  @Input() size: "default" | "small" | "large" = "default";
  @Input() background: string = "";
  @Input() border: string = "";
  @Input() borderColor: string = "";
  @Input() iconSpacing: string = "0.625rem";
  @Input() marginBottom: string = "0";
  @Input() underline: boolean = false;

  @Input() colorText: string = "";

  // callAction() {
  //   this.action.emit();
  // }

  ngOnInit(): void {
  }
  callAction() {
    if (!this.disabled && !this.showSpinner) {
      this.action.emit();
    }
  }
}
