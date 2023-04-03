import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { jqxComboBoxComponent } from 'jqwidgets-ng/jqxcombobox';
import { HttpClient } from '@angular/common/http';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  myData: any;
  viewCard: boolean = false;
  selectedItem: any;
  showSwipeModal: boolean = false;
  entryTime: any;
  user: any;
  Search: any = "Search for IMEI's...";
  selectedValue = 'today';
  @ViewChild('myComboBox') myComboBox!: jqxComboBoxComponent;
  @ViewChild('selectionlog') selectionlog!: ElementRef;
  @ViewChild(IonContent) content!: IonContent;
  rawDataList: any;
  listOfRawData: any;
  eventTimestamp: any;
  constructor(private http: HttpClient, private loadingController: LoadingController) { }
  ngOnInit() {
    this.http.get('http://localhost:8080/loggingevent/imei').subscribe(data => {
      this.myData = data;
      console.log(this.myData);
    });

  }
  trackModal(selectedData: any) {
    let date = new Date();

    let toTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON();
    this.selectedValue = selectedData;
    let fromTime = '00:00:00'
    if (selectedData === 'today') {
      this.user = {
        "fromDate": (new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON()).split('T')[0] + 'T' + fromTime.substring(0, 9),
        "toDate": toTime.split("T")[0] + 'T' + date.toTimeString().split(' ')[0],
      }
      console.log(this.user.fromDate, this.user.toDate);
    } else if (selectedData === 'yesterday') {
      let yesterday = new Date(date.setDate(date.getDate() - 1));
      this.user = {
        "fromDate": (new Date(yesterday.getTime() - (yesterday.getTimezoneOffset() * 60000)).toJSON()).split('T')[0] + 'T' + fromTime,
        "toDate": (new Date(yesterday.getTime() - (yesterday.getTimezoneOffset() * 60000)).toJSON()).split('T')[0] + 'T23:59:59'
      }
    }
  }
  myComboBoxOnSelect(event: any): void {
    if (event.args) {
      this.selectedItem = event.args.item;
      console.log(this.selectedItem.value);
      this.showSwipeModal = true;
    }
  };

  async OnShow() {
    let imei = this.selectedItem.value;
    let startDate = this.user.fromDate;
    let endDate = this.user.toDate;
    console.log(imei, startDate, endDate);
    await this.presentLoading();
    let url = `http://localhost:8080/loggingevent/rawdata`;

    const data$: Observable<any> = this.http.get<any>(`${url}/${imei}/${startDate}/${endDate}`);
    data$.subscribe({
      next: (response: any) => {
        this.rawDataList = response.map((item: any) => {
          const parsedItem = JSON.parse(item[0]);
          return parsedItem.rawData;
        });
        this.eventTimestamp = response.map((item: any) => {
          return item[1];
        });
        console.log(this.rawDataList);


        this.entryTime = this.eventTimestamp.map((timestamp: { split: (arg0: string) => [any, any]; }) => {
          const [date, time] = timestamp.split('T');
          const formattedTime = time.slice(0, -10);
          return `${date} ${formattedTime}`;
        });

        console.log(this.entryTime);


      },
      error: (err: any) => {
        console.log(err);
        this.loadingController.dismiss();
      },
      complete: () => {
        this.loadingController.dismiss();
        console.log('Completed');
        this.viewCard = true;
      }
    });

  }
  scrollTop() {
    this.content.scrollToTop(500);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
  }
}