import { PrizeService } from "src/services/prize/prize.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Notification } from "src/util/notifications";

declare const $: any;

@Component({
  selector: "app-coupon-modal",
  templateUrl: "./coupon-modal.component.html",
  styleUrls: ["./coupon-modal.component.sass"],
})
export class CouponModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Output() onCouponModal = new EventEmitter<boolean>();
  modalForm: FormGroup;
  fileToUpload: File;

  constructor(private prizeService: PrizeService) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    this.prizeService.uploadCoupons(this.id, this.fileToUpload).subscribe(
      (data) => {
        Notification.show("<b>Éxito</b>", data, "bottom", "right", "success");
        $("#couponModal").modal("hide");
        this.onCouponModal.emit(true);
      },
      (err) => {
        Notification.show("<b>Error</b>", err);
      }
    );
    this.modalForm.reset({
      file: null,
    });
  }

  extensions() {
    return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  private initForm() {
    this.modalForm = new FormGroup({
      file: new FormControl(null, [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    $("#couponModal").modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }

}
