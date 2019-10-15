import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContentModule } from '../content/content.module';
import { AccessComponent } from './access/access.component';

@NgModule({
  declarations: [MainComponent, AccessComponent],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    ContentModule,
  ],
})
export class LayoutsModule {}
