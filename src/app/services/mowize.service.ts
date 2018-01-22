import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Admin } from '../model/admin';
import { User } from '../model/user';
import { ChannelPartner } from '../model/channelpartner';
import { GraphData } from '../model/graphdata';
import { Timeline } from 'app/model/timeline';

const baseUrl = "http://medtecloud.com/";
const serviceUrl = "Services";

const url = baseUrl + serviceUrl;

@Injectable()
export class MowizeService {

    constructor(private http: Http) { }

    private headers = new Headers({
        'Content-Type': 'application/json',
        'Decode': '2',
        'Gzip': '2'
    });

    //generic method for all
    getDataFromWebServer(postData: any): Promise<string> {
        console.log(JSON.stringify(postData));
        return this.http
            .post(url, JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(response => {
                console.log(JSON.stringify(response.json()));
                // const jsonData: JSON = response.json();
                // if (jsonData['error_code'] === '400') {
                //     const message = jsonData['error_desc'];
                // };
                return JSON.stringify(response.json()) as string;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }



    //to check the login
    login(username: string, password: string): Promise<Admin> {
        console.log('username: ' + username + ', password: ' + password);
        const postData = {
            'REQUEST_TYPE_SENT': 'SERVICE_SIGNIN',
            'username': username,
            'password': password
        };
        console.log(JSON.stringify(postData));
        // return this.http
        //     .post(url, JSON.stringify(postData), { headers: this.headers })
        //     .toPromise()
        //     .then(response => {
        //         console.log('Result ' + JSON.stringify(response.json()));
        //         const jsonData: JSON = response.json();
        //         if (jsonData['error_code'] === '400') {
        //             const message = jsonData['error_desc'];
        //         };
        //         const adminId: string = jsonData['admin_user_id'];
        //         const admin: Admin = new Admin();
        //         admin.id = adminId;
        //         return admin;
        //     })
        //     .catch(this.handleError);

        const promise = new Promise<Admin>((resolve, reject) => {
            let serverresponse: string;
            if (username === 'admin' && password === 'admin') {
                serverresponse = '{"admin_user_id":"1"}';
            } else {
                serverresponse = '{"error_code":"400","error_desc":"Invalid username and password"}';
            };
            const result = JSON.parse(serverresponse);
            if (result['error_code'] === '400') {
                resolve(null);
            } else {
                const adminId: string = result['admin_user_id'];
                const admin: Admin = new Admin();
                admin.id = adminId;
                resolve(admin);
            }
        });
        return promise;
    }

    getListOfUsers(): Promise<User[]> {
        const postData = {
            'REQUEST_TYPE_SENT': 'SERVICE_GET_USERS_LIST',
            'name': '',
            'email': '',
            'id': '',
            'status': '',
            'device_type': '',
            'gender': '',
            'from': '',
            'to': '',
            'limit': '',
            'offset': ''
        };

        // this.getDataFromWebServer(postData).then(response => {
        //     const promise = new Promise<User[]>((resolve, reject) => {
        //         const result = JSON.parse(response);
        //         const user: User[] = [];
        // if (result['error_code'] === '400') {
        //     resolve(user);
        // } else {
        //     const usersList: JSON[] = result['user_list'];
        //     usersList.forEach(thisUser => {
        //         const currentUser: User = new User();
        //         currentUser.id = +thisUser['id'];
        //         currentUser.name = thisUser['full_name'];
        //         currentUser.email = thisUser['user_name'];
        //         currentUser.agentCode = thisUser['agent_code'];
        //         currentUser.dob = new Date(thisUser['dob']);
        //         currentUser.status = thisUser['status'];
        //         currentUser.createdOn = new Date(thisUser['created_on']);
        //         currentUser.assetCount = +thisUser['asset_count'];
        //         currentUser.accountCount = +thisUser['acc_count'];
        //         currentUser.plan = thisUser['sub_plan_id'];
        //         user.push(currentUser);
        //     });
        //     resolve(user);
        // }
        //     });
        //     return promise;
        // });

        const promise = new Promise<User[]>((resolve, reject) => {
            const serverresponse: string = '{"user_list":[{"id":"174","full_name":"test","user_name":"test@test.com","dob":"2017-10-17","status":"1","created_on":"2017-10-17 16:12:05","agent_code":"---","asset_count":"0","acc_count":"0","sub_plan_id":1},{"id":"173","full_name":"supriya","user_name":"suprisachdeva30@gmail.com","dob":"1989-08-30","status":"1","created_on":"2017-07-26 16:24:49","agent_code":"---","asset_count":"0","acc_count":"0","sub_plan_id":1},{"id":"172","full_name":"Sudeep Kesharwani","user_name":"kesharwani.sudeep@gmail.com","dob":"0000-00-00","status":"1","created_on":"2017-05-31 07:07:54","agent_code":"---","asset_count":"0","acc_count":"0","sub_plan_id":1},{"id":"171","full_name":"Bhagavan","user_name":"bhagavan.medisetti@gmail.com","dob":"0000-00-00","status":"1","created_on":"2017-05-28 15:21:11","agent_code":"---","asset_count":"0","acc_count":"0","sub_plan_id":1},{"id":"170","full_name":"ANKUR Toshniwal","user_name":"ankur793@gmail.com","dob":"1993-01-07","status":"1","created_on":"2017-05-27 11:22:18","agent_code":"---","asset_count":"0","acc_count":"0","sub_plan_id":1},{"id":"169","full_name":"Jaideep","user_name":"jvpatel87@gmail.com","dob":"0000-00-00","status":"1","created_on":"2017-05-26 17:01:41","agent_code":"---","asset_count":"0","acc_count":"0","sub_plan_id":1},{"id":"168","full_name":"Pankaj Kumar","user_name":"pankaj98101997@gmail.com","dob":"1997-07-10","status":"1","created_on":"2017-05-26 13:24:40","agent_code":"---","asset_count":"0","acc_count":"0","sub_plan_id":1},{"id":"167","full_name":"Abhinav Seth","user_name":"abhinavthercbfan@yahoo.com","dob":"1999-05-12","status":"1","created_on":"2017-05-26 13:21:10","agent_code":"---","asset_count":"0","acc_count":"0","sub_plan_id":1},{"id":"166","full_name":"ashish bhaskar","user_name":"bhaskarashish22@gmail.com","dob":"0000-00-00","status":"1","created_on":"2017-05-23 04:58:01","agent_code":"---","asset_count":"0","acc_count":"0","sub_plan_id":1},{"id":"165","full_name":"Geetanjli","user_name":"gchhabra1997@gmail.com","dob":"1997-09-17","status":"1","created_on":"2017-05-22 06:16:38","agent_code":"---","asset_count":"0","acc_count":"0","sub_plan_id":1}]}';
            const result = JSON.parse(serverresponse);
            const user: User[] = [];
            if (result['error_code'] === '400') {
                resolve(user);
            } else {
                const usersList: JSON[] = result['user_list'];
                usersList.forEach(thisUser => {
                    const currentUser: User = new User();
                    currentUser.id = +thisUser['id'];
                    currentUser.name = thisUser['full_name'];
                    currentUser.email = thisUser['user_name'];
                    currentUser.agentCode = thisUser['agent_code'];
                    currentUser.dob = new Date(thisUser['dob']);
                    currentUser.status = +thisUser['status'];
                    currentUser.createdOn = new Date(thisUser['created_on']);
                    currentUser.assetCount = +thisUser['asset_count'];
                    currentUser.accountCount = +thisUser['acc_count'];
                    currentUser.plan = thisUser['sub_plan_id'];
                    user.push(currentUser);
                });
                resolve(user);
            }
        });
        return promise;
    }

    getUserDetails(id: string): Promise<User> {
        const postData = {
            'REQUEST_TYPE_SENT': 'SERVICE_GET_USER_DETAIL',
            'user_id': id
        };

        //fake server request from json
        const promise = new Promise<User>((resolve, reject) => {
            const serverresponse: string = '{"userdetail":{"id":"1","agent_code":"cp_1","full_name":"Ravi Mathpal","user_name":"ravimail26@gmail.com","u_password":"dee35e987754f1f911a01bccd16f2a187edea5dc","forgot_password":"","phone":"918285939197","otp":"","dob":"1991-12-31","gender":"M","profession_id":"9","salary_bracket":"3","device_id":null,"device_name":"","device_type":"1","device_token":"fR52JcEDT_A:APA91bGWfRahbINhCBBgkHEC3q9PfT41YqTxRI8AlysB9YlhwzXFxW88klYsSkQeEf6oBBiiPiMSihOZQ9v0a4qCPtUSfReaIrQ1-g2OKaShJPcTofOUFwlZAmGNcu05DauPLXi7Z2Kg","profile_pic":"https://s3-ap-southeast-1.amazonaws.com/mowize-documents/MQ==/profile/2017_03_28_13_11_17.jpg","created_on":"2017-02-09 10:29:05","last_login_datetime":"2017-08-09 00:00:00","last_login_source":"3","last_logout_time":"2017-04-06 00:00:00","is_login":true,"term_conditions":"0","google_api_id":"105937555620781766480","status":"1"},"getTimelineList":[{"timeline_log":"qw234qa","created_on":"2017-08-09 13:30:19","title":"Insurance Created","category_name":"Vehicle","category_id":"5"},{"timeline_log":"ZZZ","created_on":"2017-03-29 13:02:57","title":"Document Shared","category_name":"Health","category_id":"7"},{"timeline_log":"Amt Rs 20000","created_on":"2016-12-19 13:43:41","title":"Rent Invoice Updated","category_name":"Rent Generating","category_id":"36"},{"timeline_log":"Amt Rs/-  6574.00","created_on":"2016-05-31 11:54:56","title":"Edit Payment","category_name":"Insurance","category_id":"1"},{"timeline_log":"Amt Rs/-  6574","created_on":"2016-05-31 11:54:28","title":"Premium Paid","category_name":"Vehicle","category_id":"5"},{"timeline_log":"Amt Rs/-  87878","created_on":"2016-05-31 11:48:04","title":"Real Estate Updated","category_name":"Self Occupied","category_id":"35"},{"timeline_log":"Amt Rs/-  87878","created_on":"2016-05-30 12:54:30","title":"Real Estate Updated","category_name":"Self Occupied","category_id":"35"},{"timeline_log":"Amt Rs/-  87878","created_on":"2016-05-26 15:55:24","title":"Real Estate Updated","category_name":"Self Occupied","category_id":"35"},{"timeline_log":"Amt Rs/-  87878","created_on":"2016-05-26 15:55:12","title":"Real Estate Updated","category_name":"Self Occupied","category_id":"35"},{"timeline_log":"Edit  Fixed Income5368","created_on":"2016-05-26 15:54:54","title":"Fixed Income updated","category_name":"RD","category_id":"34"}]}';
            const result = JSON.parse(serverresponse);
            console.log('Result is ');
            console.log(result);
            var user: User;
            if (result['error_code'] === '400') {
                resolve(user);
            } else {
                const thisUser: JSON = result['userdetail'];
                console.log(thisUser);
                var currentUser: User = new User();
                currentUser.id = +thisUser['id'];
                currentUser.name = thisUser['full_name'];
                currentUser.email = thisUser['user_name'];
                currentUser.agentCode = thisUser['agent_code'];
                currentUser.dob = new Date(thisUser['dob']);
                currentUser.status = thisUser['status'];
                currentUser.createdOn = new Date(thisUser['created_on']);
                currentUser.assetCount = +thisUser['asset_count'];
                currentUser.accountCount = +thisUser['acc_count'];
                currentUser.plan = thisUser['sub_plan_id'];
                currentUser.phone = thisUser['phone'];
                currentUser.gender = thisUser['gender'];
                currentUser.professionId = +thisUser['profession_id'];
                currentUser.salaryBracket = +thisUser['salary_bracket'];
                currentUser.deviceId = +thisUser['device_type'];
                currentUser.profilePic = thisUser['profile_pic'];

                var timelineList: JSON[] = result['getTimelineList'];
                console.log(timelineList);

                timelineList.forEach(time => {
                    var timeline: Timeline = new Timeline();
                    timeline.categoryId = +time['category_id'];
                    timeline.categoryName = time['category_name'];
                    timeline.title = time['title'];
                    timeline.createdOn = new Date(time['created_on']);
                    timeline.timelinelog = time['timeline_log'];
                    if ((timelineList.indexOf(time) + 1) % 2 === 0) {
                        timeline.cssClass = '';
                    } else {
                        timeline.cssClass = 'timeline-inverted';
                    }
                    timeline.timelinelog = time['timeline_log'];
                    currentUser.listOfTimeline.push(timeline);
                });
                resolve(currentUser);
            }
        });
        return promise;
    }

    getListOfChannelPartners(): Promise<ChannelPartner[]> {
        const postData = {
            'REQUEST_TYPE_SENT': 'SERVICE_GET_USERS_LIST',
            'name': '',
            'email': '',
            'id': '',
            'status': '',
            'device_type': '',
            'gender': '',
            'from': '',
            'to': '',
            'limit': '',
            'offset': ''
        };

        // this.getDataFromWebServer(postData).then(response => {
        //     const promise = new Promise<User[]>((resolve, reject) => {
        //         const result = JSON.parse(response);
        //         const user: User[] = [];
        //         if (result['error_code'] === '400') {
        //             resolve(user);
        //         } else {
        //             const usersList: JSON[] = result['user_list'];
        //             usersList.forEach(thisUser => {
        //                 var currentUser: User = new User();
        //                 currentUser.id = thisUser['id'];
        //                 currentUser.name = thisUser['full_name'];
        //                 currentUser.email = thisUser['user_name'];
        //                 user.push(currentUser);
        //             });
        //             resolve(user);
        //         }
        //     });
        //     return promise;
        // });

        const promise = new Promise<ChannelPartner[]>((resolve, reject) => {
            const serverresponse: string = '{"user_list":[{"id":"174","full_name":"Ravi Mathpal","user_name":"ravimail26@gmail.com","dob":"1991-12-31","status":"1","created_on":"2017-1-17 16:12:05","agent_code":"GETMOWIZE","asset_count":"10","acc_count":"2","sub_plan_id":"1"},{"id":"175","full_name":"Rachna Khokhar","user_name":"rachnakhokhar@gmail.com","dob":"1991-12-31","status":"1","created_on":"2017-10-17 16:12:05","agent_code":"---","asset_count":"15","acc_count":"10","sub_plan_id":"2"},{"id":"176","full_name":"neha","user_name":"neha@test.com","dob":"2017-10-17","status":"1","created_on":"2017-10-17 16:12:05","agent_code":"---","asset_count":"0","acc_count":"0","sub_plan_id":"1"}]}';
            const result = JSON.parse(serverresponse);
            const channelpartners: ChannelPartner[] = [];
            if (result['error_code'] === '400') {
                resolve(channelpartners);

            } else {
                const usersList: JSON[] = result['user_list'];
                usersList.forEach(thisUser => {
                    const currentUser: ChannelPartner = new ChannelPartner();
                    currentUser.created_on = new Date(thisUser['']);
                    currentUser.agent_id = thisUser['full_name'];
                    currentUser.name = thisUser['user_name'];
                    currentUser.above25 = +thisUser['agent_code'];
                    currentUser.below25 = +thisUser['agent_code'];
                    currentUser.code = thisUser['status'];
                    currentUser.annualUsers = thisUser['created_on'];
                    currentUser.termUsers = +thisUser['asset_count'];
                    currentUser.earning = +thisUser['acc_count'];
                    currentUser.contactNo = thisUser['sub_plan_id'];
                    channelpartners.push(currentUser);
                });
                resolve(channelpartners);
            }
        });
        return promise;
    }

    getGraphData(): Promise<GraphData> {

        const postData = {
            'REQUEST_TYPE_SENT': 'SERVICE_GET_DASHBOARD_GRAPH',
            'from_date': '',
            'to_date': ''
        };

        // this.getDataFromWebServer(postData).then(response => {
        //     const promise = new Promise<GraphData>((resolve, reject) => {
        //         const result = JSON.parse(response);
        //         var graphData: GraphData = new GraphData();
        //         if (result['error_code'] === '400') {
        //             resolve(graphData);

        //         } else {
        //             const data: JSON = result['data'];
        //             graphData.activeUser = +data['activeUser'];
        //             graphData.dropUser = +data['dropUser'];
        //             graphData.inactiveUser = +data['InActiveUserCount'];
        //             graphData.androidUser = +data['androidUserCount'];
        //             graphData.iosUser = +data['iosUserCount'];
        //             graphData.webUser = +data['webUserCount'];
        //             graphData.nonDeviceCount = +data['nonDeviceCount'];
        //             graphData.halfActiveUser = +data['halfActiveUserCount'];
        //             resolve(graphData);
        //         }
        //     });
        //     return promise;
        // });

        const promise = new Promise<GraphData>((resolve, reject) => {

            const serverresponse: string = '{"data":{"activeUser":"126","dropUser":"3","InActiveUserCount":0,"androidUserCount":"61","iosUserCount":"42","webUserCount":"21","nonDeviceCount":2,"halfActiveUserCount":"2"}}';

            const result = JSON.parse(serverresponse);
            const graphData: GraphData = new GraphData();
            if (result['error_code'] === '400') {
                resolve(graphData);

            } else {
                const data: JSON = result['data'];
                graphData.activeUser = +data['activeUser'];
                graphData.dropUser = +data['dropUser'];
                graphData.inactiveUser = +data['InActiveUserCount'];
                graphData.androidUser = +data['androidUserCount'];
                graphData.iosUser = +data['iosUserCount'];
                graphData.webUser = +data['webUserCount'];
                graphData.nonDeviceCount = +data['nonDeviceCount'];
                graphData.halfActiveUser = +data['halfActiveUserCount'];
                resolve(graphData);
            }
        });
        return promise;

    }


}