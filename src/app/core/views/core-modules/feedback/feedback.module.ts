import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularSvgIconModule } from "angular-svg-icon";
import { FeedbackMaterialModule } from "./feedback-material.module";
import { FeedbackRoutingModule } from "./feedback-routing.module";
import { FeedbackComponent } from "./feedback.component";

@NgModule({
  declarations:[FeedbackComponent],
  imports:[
    CommonModule,
    FeedbackRoutingModule,
    AngularSvgIconModule,
    FeedbackMaterialModule,

  ],
})

export class FeedbackModule {}
