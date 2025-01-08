import { NgClass, NgStyle } from "@angular/common";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
  imports: [NgClass, IonicModule, NgStyle],
})
export class ButtonComponent {
  @Output() action = new EventEmitter();

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
  @Input() alignIcon: string = "";
  @Input() size: string = "default";
  @Input() background: string = "";
  @Input() border: string = "default";
  @Input() borderColor: string = "";
  @Input() iconSpacing: string = "0.625rem";
  @Input() marginBottom: string = "0";
  @Input() underline: boolean = false;

  @Input() colorText: string = "default";

  callAction() {
    this.action.emit();
  }

  ngOnInit(): void {
  }
}
