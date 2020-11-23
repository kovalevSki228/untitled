import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule
  ]
})

export class SharedModule { }
