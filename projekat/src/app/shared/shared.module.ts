import { NavbarComponent } from './../features/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { OnlyText } from './directives/only-text.directive';
import { PinInput } from './directives/pin-input.directive';
import { DebounceClickDirective } from './directives/debounce.directive';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';

const materialModules = [
    //material modules
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule,
    MatRippleModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule
]

const directives = [
    OnlyText,
    PinInput,
    DebounceClickDirective
]

@NgModule({
    declarations: [directives, NavbarComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        materialModules
    ],
    exports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        materialModules,
        directives,
        NavbarComponent
    ],
    providers: [],
})
export class SharedModule { }
