import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Admin } from '../model/admin';
import { User } from '../model/user';
import { ChannelPartner } from '../model/channelpartner';
import { GraphData } from '../model/graphdata';
import { Timeline } from 'app/model/timeline';
import { CategoryData } from 'app/model/categoryData';
import { ChannelPartnerDocument } from 'app/model/channelPartnerDocument';
import { DocumentTimeline } from 'app/model/documentTimeline';
import { Company } from 'app/model/company';
import { Profession } from 'app/model/profession';
import { EmailTemplate } from 'app/model/emailtemplate';
import { resolve } from 'url';

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

    private uploadHeaders = new Headers({
        'Content-Type': 'multipart/form-data',
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

    getListOfUsers(fromDate: string, toDate: string, platform: string, gender: string, status: string): Promise<User[]> {
        const postData = {
            'REQUEST_TYPE_SENT': 'SERVICE_GET_USERS_LIST',
            'name': '',
            'email': '',
            'id': '',
            'status': status,
            'device_type': platform,
            'gender': gender,
            'from': fromDate,
            'to': toDate,
            'limit': '',
            'offset': ''
        };
        console.log(postData);

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
            var user: User;
            if (result['error_code'] === '400') {
                resolve(user);
            } else {
                const thisUser: JSON = result['userdetail'];
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

    blockOrUnblockUser(userId: string, status: string): Promise<boolean> {
        const postData = {
            'REQUEST_TYPE_SENT': 'SERVICE_BLOCK_UNBLOCK_USER',
            'user_id': userId,
            'type': status
        };

        const promise = new Promise<boolean>((resolve, reject) => {
            const serverresponse: string = '{"user_id":"174"}';
            const result = JSON.parse(serverresponse);
            var finalResult = false;
            if (result['error_code'] === '400') {
                resolve(finalResult);
            } else {
                finalResult = true;
                resolve(finalResult);
            }
        });
        return promise;
    }

    getListOfChannelPartners(): Promise<ChannelPartner[]> {
        const postData = {
            'REQUEST_TYPE_SENT': 'SERVICE_CP_LIST',
            'name': '',
            'email_id': '',
            'parent_id': '',
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
            const serverresponse: string = '{"cp_list":[{"id":"6","agent_id":"MOWIZE6","name":"asdasdsad","email_id":"asa@as.com","phone":"1234567898","created_on":"2017-08-04 11:09:13","above_count_code":"0","below_count_code":"0","count_code":"0","annual_plan_count":"0","five_year_plan_count":"0","total_earning":0},{"id":"5","agent_id":"MOWIZE5","name":"aasaasasa","email_id":"asa@as.com","phone":"8285939197","created_on":"2017-08-04 11:08:41","above_count_code":"0","below_count_code":"0","count_code":"0","annual_plan_count":"0","five_year_plan_count":"0","total_earning":0},{"id":"4","agent_id":"MOWIZE4","name":"aasaasasa","email_id":"asa@as.com","phone":"8285939197","created_on":"2017-08-04 11:07:59","above_count_code":"0","below_count_code":"0","count_code":"0","annual_plan_count":"0","five_year_plan_count":"0","total_earning":0},{"id":"3","agent_id":"MOWIZE3","name":"supriya","email_id":"supriya.sachdeva30@gmail.com","phone":"8285939197","created_on":"2017-08-04 11:03:06","above_count_code":"0","below_count_code":"0","count_code":"0","annual_plan_count":"0","five_year_plan_count":"0","total_earning":0},{"id":"2","agent_id":"MOWIZE2","name":"supriya","email_id":"supriya.sachdeva30@gmail.com","phone":"8285939197","created_on":"2017-08-04 11:00:14","above_count_code":"0","below_count_code":"0","count_code":"0","annual_plan_count":"0","five_year_plan_count":"0","total_earning":0},{"id":"1","agent_id":"MOWIZE1","name":"Supriya sachdeva","email_id":"supriyasachdeva@mowize.com","phone":"8285939197","created_on":"2017-07-21 11:38:02","above_count_code":"0","below_count_code":"0","count_code":"0","annual_plan_count":"0","five_year_plan_count":"0","total_earning":0}]}';
            const result = JSON.parse(serverresponse);
            const channelpartners: ChannelPartner[] = [];
            if (result['error_code'] === '400') {
                resolve(channelpartners);

            } else {
                const usersList: JSON[] = result['cp_list'];
                usersList.forEach(thisUser => {
                    const currentUser: ChannelPartner = new ChannelPartner();
                    currentUser.createdOn = new Date(thisUser['created_on']);
                    currentUser.id = +thisUser['id'];
                    currentUser.agent_id = thisUser['agent_id'];
                    currentUser.name = thisUser['name'];
                    currentUser.email = thisUser['email_id'];
                    currentUser.phone = thisUser['phone'];
                    currentUser.above25 = +thisUser['above_count_code'];
                    currentUser.below25 = +thisUser['below_count_code'];
                    currentUser.code = +thisUser['count_code'];
                    currentUser.annualUsers = +thisUser['annual_plan_count'];
                    currentUser.termUsers = +thisUser['five_year_plan_count'];
                    currentUser.earning = +thisUser['total_earning'];

                    channelpartners.push(currentUser);
                });
                resolve(channelpartners);
            }
        });
        return promise;
    }

    deleteChannelPartner(id: string): Promise<boolean> {
        const postData = {
            'REQUEST_TYPE_SENT': 'SERVICE_DELETE_CP',
            'cp_id': id
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

        const promise = new Promise<boolean>((resolve, reject) => {
            const serverresponse: string = '{}';
            const result = JSON.parse(serverresponse);
            const channelpartners: ChannelPartner[] = [];
            if (result['error_code'] === '400') {
                resolve(false);
            } else {
                resolve(true);
            }
        });
        return promise;
    }

    resendChannelPartnerCode(id: string): Promise<boolean> {
        const postData = {
            'REQUEST_TYPE_SENT': 'SERVICE_RESEND_CODE',
            'cp_id': id
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

        const promise = new Promise<boolean>((resolve, reject) => {
            const serverresponse: string = '{}';
            const result = JSON.parse(serverresponse);
            if (result['error_code'] === '400') {
                resolve(false);
            } else {
                resolve(true);
            }
        });
        return promise;
    }

    getChannelPartnerDetails(id: string): Promise<ChannelPartner> {
        const postData = {
            'REQUEST_TYPE_SENT': 'SERVICE_GET_AGENT_DETAIL',
            'cp_id': id
        };

        const promise = new Promise<ChannelPartner>((resolve, reject) => {
            const serverresponse: string = '{"cp_detail":{"id":"1","agent_id":"MOWIZE1","password":"ca0a0455c61e592bd38d811c7b2c72124e4940b9","parent_id":"0","name":"Supriya sachdeva","email_id":"supriyasachdeva@mowize.com","address":"ggn","bank_id":"266","account_no":"1645123412341234","ifsc_code":"1232assd","branch_address":"ggn","phone":"8285939197","profile_pic":"","created_on":"2017-07-21 11:38:02","status":"1","promocode_1":"MOWIZE1Y1","count_1":"0","promocode_2":"MOWIZE1Y5","count_2":"0","bank_name":"Kotak Mahindra Bank Limited","total_count":"0","layer1":"0","layer2":"0","layer3":"0","layer4":"0"},"document_array_list":[{"id":"2","doc_name":"GSNFY25KH0.jpg","agent_id":"1","created_on":"2017-03-01 12:30:32"},{"id":"3","doc_name":"5RHAM70.jpg","agent_id":"1","created_on":"2017-03-01 12:30:32"},{"id":"4","doc_name":"BTC4A0.jpg","agent_id":"1","created_on":"2017-03-01 12:30:32"},{"id":"5","doc_name":"6KULM50.jpg","agent_id":"1","created_on":"2017-03-01 12:30:32"}]}';
            const result = JSON.parse(serverresponse);
            const channelpartner: ChannelPartner = new ChannelPartner();
            if (result['error_code'] === '400') {
                resolve(null);
            } else {
                var details: JSON = result['cp_detail'];
                channelpartner.createdOn = new Date(details['created_on']);
                channelpartner.id = +details['id'];
                channelpartner.agent_id = details['agent_id'];
                channelpartner.name = details['name'];
                channelpartner.email = details['email_id'];
                channelpartner.phone = details['phone'];
                channelpartner.above25 = +details['above_count_code'];
                channelpartner.below25 = +details['below_count_code'];
                channelpartner.code = +details['total_count'];
                channelpartner.annualUsers = +details['count_1'];
                channelpartner.termUsers = +details['count_2'];
                channelpartner.earning = +details['total_earning'];

                channelpartner.bankId = +details['bank_id'];
                channelpartner.bankName = details['bank_name'];
                channelpartner.accountNumber = details['account_no'];
                channelpartner.ifscCode = details['ifsc_code'];
                channelpartner.address = details['address'];
                channelpartner.branchAddress = details['branch_address'];
                channelpartner.profilePic = details['profile_pic'];
                channelpartner.status = +details['status'];
                channelpartner.annualPromoCode = details['promocode_1'];
                channelpartner.termPromoCode = details['promocode_2'];
                channelpartner.termPromoCode = details['promocode_2'];
                channelpartner.layer1 = +details['layer1'];
                channelpartner.layer2 = +details['layer2'];
                channelpartner.layer3 = +details['layer3'];
                channelpartner.layer4 = +details['layer4'];

                var docs: JSON[] = result['document_array_list'];
                channelpartner.listOfDocuments = [];
                docs.forEach(document => {
                    var cpDocument: ChannelPartnerDocument = new ChannelPartnerDocument();
                    cpDocument.id = +document['id'];
                    cpDocument.agentId = +document['agent_id'];
                    cpDocument.name = document['doc_name'];
                    cpDocument.createdOn = new Date(document['created_on']);
                    channelpartner.listOfDocuments.push(cpDocument);
                });

                resolve(channelpartner);
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


    getRecordsData(fromDate: string, toDate: string): Promise<CategoryData[]> {

        const postData = {
            'REQUEST_TYPE_SENT': 'SERVICE_GET_RECORD_LIST',
            'from_date': fromDate,
            'to_date': toDate
        };

        console.log(postData);

        const promise = new Promise<CategoryData[]>((resolve, reject) => {

            const serverresponse: string = '{"loginPageData":[{"category_id":"5","category_name":"Vehicle","total_count":"16","total_value":"2216403029"},{"category_id":"15","category_name":"Account","total_count":"8","total_value":"184853726"},{"category_id":"17","category_name":"Mutual Funds SIP","total_count":"12","total_value":"127518329.64422214"},{"category_id":"18","category_name":"Mutual Funds","total_count":"6","total_value":"127406205.46388961"},{"category_id":"19","category_name":"Listed Stocks","total_count":"11","total_value":4244160.47},{"category_id":"20","category_name":"Unlisted Stocks","total_count":"8","total_value":"649561"},{"category_id":"22","category_name":"Jewellery","total_count":"5","total_value":"137267734"},{"category_id":"23","category_name":"Home","total_count":"28","total_value":"50147139"},{"category_id":"24","category_name":"Car","total_count":"31","total_value":"106097086"},{"category_id":"25","category_name":"Education","total_count":"18","total_value":"551437651"},{"category_id":"26","category_name":"Loan Against Property","total_count":"12","total_value":"256564237"},{"category_id":"27","category_name":"Security","total_count":"17","total_value":"252381765"},{"category_id":"28","category_name":"Others","total_count":"9","total_value":"131634708"},{"category_id":"38","category_name":"Under Construction Loan","total_count":"1","total_value":"230000"},{"category_id":"39","category_name":"Personal","total_count":"3","total_value":"7500000"},{"category_id":"29","category_name":"PPF","total_count":"1","total_value":"0"},{"category_id":"30","category_name":"Money Back Policy","total_count":"6","total_value":"342424"},{"category_id":"31","category_name":"PF","total_count":"3","total_value":"30000"},{"category_id":"32","category_name":"Bonds","total_count":"1","total_value":"10000"},{"category_id":"33","category_name":"FD","total_count":"1","total_value":"50000"},{"category_id":"34","category_name":"RD","total_count":"12","total_value":"12035901"},{"category_id":"40","category_name":"Others","total_count":"1","total_value":"150000"},{"category_id":"35","category_name":"Self Occupied","total_count":"6","total_value":"23218000"},{"category_id":"36","category_name":"Rent Generating","total_count":"8","total_value":"15403220"},{"category_id":"37","category_name":"Under Construction","total_count":"3","total_value":"7000000"}],"total_record_count":"227","total_record_value":"4212574876.5781"}';

            const result = JSON.parse(serverresponse);
            const categoryData: CategoryData[] = [];
            if (result['error_code'] === '400') {
                resolve(categoryData);

            } else {
                const data: JSON[] = result['loginPageData'];
                data.forEach(jsonData => {
                    var catData: CategoryData = new CategoryData();
                    catData.categoryId = +jsonData['category_id'];
                    catData.categoryName = jsonData['category_name'];
                    catData.totalCount = +jsonData['total_count'];
                    catData.totalValue = +jsonData['total_value'];
                    categoryData.push(catData);

                });
                resolve(categoryData);
            }
        });
        return promise;
    }


    getListOfTimeline(): Promise<DocumentTimeline[]> {
        const postData = {
            'REQUEST_TYPE_SENT': 'SERVICE_GET_TIMELINE_LIST'
        };

        console.log(postData);

        const promise = new Promise<DocumentTimeline[]>((resolve, reject) => {

            const serverresponse: string = '{"timeline_list":[{"id":"1","title":"Insurance Created","icon":"envolpe.png"},{"id":"2","title":"New People Added","icon":"user_icon.png"},{"id":"3","title":"Premium Paid","icon":""},{"id":"4","title":"Insurance Deleted","icon":""},{"id":"5","title":"Document Shared","icon":""},{"id":"6","title":"Edit Payment","icon":""},{"id":"7","title":"Account Created","icon":""},{"id":"8","title":"Liability Added","icon":""},{"id":"9","title":"Document Added","icon":""},{"id":"10","title":"Document Deleted","icon":""},{"id":"12","title":"Jewellery Added","icon":""},{"id":"13","title":"Jewellery Updated","icon":""},{"id":"14","title":"Added Unlisted Stock","icon":""},{"id":"15","title":"Updated Unlisted Stock","icon":""},{"id":"16","title":"Account Updated","icon":""},{"id":"17","title":"Payment Deleted","icon":""},{"id":"18","title":"Account Deleted","icon":""},{"id":"19","title":"Liability Deleted","icon":""},{"id":"20","title":"Jewellery Deleted","icon":""},{"id":"21","title":"Unlisted Stock Deleted","icon":""},{"id":"22","title":"Real Estate Added","icon":""},{"id":"23","title":"Real Estate Deleted","icon":""},{"id":"24","title":"Real Estate Updated","icon":""},{"id":"25","title":"Listed Stock Added","icon":""},{"id":"26","title":"Listed Stock updated","icon":""},{"id":"27","title":"Listed Stock Deleted","icon":""},{"id":"28","title":"Fixed Income Created","icon":""},{"id":"29","title":"Fixed Income updated","icon":""},{"id":"30","title":"Fixed Income Deleted","icon":""},{"id":"31","title":"Mutual Fund Added","icon":""},{"id":"32","title":"Ledger Created","icon":""},{"id":"33","title":"Ledger Updated","icon":""},{"id":"34","title":"Ledger Deleted","icon":""},{"id":"35","title":"Rent Invoice Added","icon":""},{"id":"36","title":"Rent Invoice Updated","icon":""},{"id":"37","title":"Insurance Updated","icon":""},{"id":"38","title":"Liability updated","icon":""},{"id":"39","title":"Mutual Fund Updated","icon":""},{"id":"40","title":"Mutual Fund Deleted","icon":""},{"id":"41","title":"Mutual Fund Stopped","icon":""},{"id":"42","title":"RD Stopped","icon":""}]}';

            const result = JSON.parse(serverresponse);
            const timeLineList: DocumentTimeline[] = [];
            if (result['error_code'] === '400') {
                resolve(timeLineList);

            } else {
                const data: JSON[] = result['timeline_list'];
                data.forEach(jsonData => {
                    var timeline: DocumentTimeline = new DocumentTimeline();
                    timeline.id = +jsonData['id'];
                    timeline.title = jsonData['title'];
                    timeline.icon = jsonData['icon'];
                    timeLineList.push(timeline);

                });
                resolve(timeLineList);
            }
        });
        return promise;
    }

    editTimeline(id: string, title: string): Promise<boolean> {
        const postData = {
            'REQUEST_TYPE_SENT': 'SERVICE_EDIT_TIMELINE_TYPE',
            'id': id,
            'title': title
        };

        console.log(postData);

        const promise = new Promise<boolean>((resolve, reject) => {

            const serverresponse: string = '{}';

            const result = JSON.parse(serverresponse);
            if (result['error_code'] === '400') {
                resolve(false);

            } else {
                resolve(true);
            }
        });
        return promise;
    }

    getCompanies(): Promise<Company[]> {
        const postData = {
            'REQUEST_TYPE_SENT': 'SERVICE_GET_COMPANY_LIST'
        };

        const promise = new Promise<Company[]>((resolve, reject) => {
            const serverresponse: string = '{"company_list":[{"id":"1","name":"Bajaj Allianz Life Insurance Company Limited","category_id":"6","type":"1","image":""},{"id":"2","name":"Birla Sun Life Insurance Company Limited","category_id":"6","type":"1","image":""},{"id":"15","name":"Shriram Life Insurance Company Limited","category_id":"20","type":"1","image":""},{"id":"18","name":"IDBI Federal Life Insurance Company Limited","category_id":"20","type":"1","image":""},{"id":"25","name":"Bajaj Allianz General Insurance Company Limited","category_id":"5","type":"1","image":""},{"id":"26","name":"ICICI Lombard General Insurance Company Limited","category_id":"5","type":"1","image":""},{"id":"53","name":"Bajaj Allianz General Insurance Company Limited","category_id":"7","type":"1","image":""},{"id":"54","name":"ICICI Lombard General Insurance Company Limited","category_id":"7","type":"1","image":""},{"id":"81","name":"Bajaj Allianz General Insurance Company Limited","category_id":"8","type":"1","image":""},{"id":"82","name":"ICICI Lombard General Insurance Company Limited","category_id":"8","type":"1","image":""},{"id":"109","name":"Bajaj Allianz General Insurance Company Limited","category_id":"9","type":"1","image":""},{"id":"110","name":"ICICI Lombard General Insurance Company Limited","category_id":"9","type":"1","image":""},{"id":"137","name":"Axis Bank","category_id":"10","type":"1","image":""},{"id":"138","name":"Bank of Baroda","category_id":"10","type":"1","image":""},{"id":"160","name":"HDFC ERGO General Insurance Company Limited","category_id":"14","type":"1","image":""},{"id":"161","name":"Export Credit Guarantee Corporation of India Limited","category_id":"14","type":"1","image":""},{"id":"162","name":"Bajaj Allianz Life Insurance Company Limited","category_id":"30","type":"1","image":""},{"id":"163","name":"Birla Sun Life Insurance Company Limited","category_id":"30","type":"1","image":""},{"id":"183","name":"Kotak Mahindra Old Mutual Life Insurance Limited","category_id":"19","type":"1","image":""},{"id":"184","name":"PNB Metlife India Insurance Company Limited","category_id":"19","type":"1","image":null},{"id":"185","name":"Kotak Mahindra Old Mutual Life Insurance Limited","category_id":"33","type":"1","image":null},{"id":"186","name":"PNB Metlife India Insurance Company Limited","category_id":"33","type":"1","image":null},{"id":"187","name":"Abhyudaya Cooperative Bank Limited","category_id":"0","type":"2","image":null},{"id":"188","name":"Abu Dhabi Commercial Bank","category_id":"0","type":"2","image":null},{"id":"189","name":"Ahmedabad Mercantile Cooperative Bank","category_id":"0","type":"2","image":null},{"id":"190","name":"Airtel Payments Bank Limited","category_id":"0","type":"2","image":null},{"id":"365","name":"Can Fin Homes Limited","category_id":"23","type":"1","image":null},{"id":"366","name":"Cent Bank Home Finance Limited","category_id":"23","type":"1","image":null},{"id":"452","name":"Bajaj Allianz General Insurance Company Limited","category_id":"13","type":"1","image":null},{"id":"453","name":"ICICI Lombard General Insurance Company Limited","category_id":"13","type":"1","image":null},{"id":"483","name":"Abhyudaya Cooperative Bank Limited","category_id":"23","type":"1","image":null},{"id":"484","name":"Abu Dhabi Commercial Bank","category_id":"23","type":"1","image":null},{"id":"673","name":"Other Bank","category_id":"0","type":"2","image":null}]}';
            var companies: Company[] = [];
            const result = JSON.parse(serverresponse);
            if (result['error_code'] === '400') {
                resolve(companies);
            } else {
                var companyList: JSON[] = result['company_list'];
                companyList.forEach(com => {
                    var comp: Company = new Company();
                    comp.categoryId = +com['category_id'];
                    comp.id = +com['id'];
                    comp.name = com['name'];
                    comp.type = +com['type'];

                    companies.push(comp);
                });
                resolve(companies);
            }
        });

        return promise;

    }

    uploadDividend(file: File): Promise<boolean> {

        let formData: FormData = new FormData();
        formData.append('file', file);

        return this.http
            .post(url, formData, { headers: this.uploadHeaders })
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

        // const promise = new Promise<boolean>((resolve, reject) => {
        //     const serverresponse: string = '{}';
        //     const result = JSON.parse(serverresponse);
        //     if (result['error_code'] === '400') {
        //         resolve(false);
        //     } else {
        //         resolve(true);
        //     }
        // });
        // return promise;
    }

    getCompanyDetails(id: number): Promise<string[]> {
        const postData = {
            'REQUEST_TYPE_SENT': 'SERVICE_GET_COMPANY_DETAIL',
            'company_id': id + ''
        };

        const promise = new Promise<string[]>((resolve, reject) => {
            const serverresponse: string = '{"company_detail":["6","30","19","33"]}';
            const result = JSON.parse(serverresponse);
            var ids = [];
            if (result['error_code'] === '400') {
                resolve(ids);
            } else {
                var resultArray: JSON[] = result['company_detail'];
                resultArray.forEach(string => {
                    ids.push(string);
                });
                resolve(ids);
            }
        });
        return promise;
    }

    addCompany(id: number, name: string, type: number, categories: string[]): Promise<boolean> {

        const postData = {
            'REQUEST_TYPE_SENT': 'SERVICE_ADD_COMPANY',
            'company_name': name,
            'company_type': type + '',
            'category_id_array': categories
        };

        console.log(postData);

        const promise = new Promise<boolean>((resolve, reject) => {
            const serverresponse: string = '{}';
            const result = JSON.parse(serverresponse);
            if (result['error_code'] === '400') {
                resolve(false);
            } else {
                resolve(true);
            }
        });
        return promise;
    }

    editCompany(id: number, name: string, type: number, categories: string[]): Promise<boolean> {
        const postData = {
            'REQUEST_TYPE_SENT': 'SERVICE_EDIT_COMPANY',
            'company_id': id + '',
            'company_name': name,
            'company_type': type + '',
            'category_id_array': categories
        };
        console.log(postData);

        const promise = new Promise<boolean>((resolve, reject) => {
            const serverresponse: string = '{}';
            const result = JSON.parse(serverresponse);
            if (result['error_code'] === '400') {
                resolve(false);
            } else {
                resolve(true);
            }
        });
        return promise;
    }

    getListOfProfessions(): Promise<Profession[]> {
        const postData = {
            'REQUEST_TYPE_SENT': 'SERVICE_PROFESSION_LIST'
        };

        const promise = new Promise<Profession[]>((resolve, reject) => {
            const serverresponse: string = '{"profession_list_array":[{"id":"1","name":"Architect\r\n","description":"Architect\r\n","status":"1"},{"id":"2","name":"Business Consultant\r\n","description":"Business Consultant\r\n","status":"1"},{"id":"3","name":"Chairman/Owner/CEO/Partner","description":"Chairman/Owner/CEO/Partner","status":"1"},{"id":"4","name":"Creative Consultants\r\n","description":"Creative Consultants\r\n","status":"1"},{"id":"5","name":"Educator\r\n","description":"Educator\r\n","status":"1"},{"id":"6","name":"Engineer\r\n","description":"Engineer\r\n","status":"1"},{"id":"7","name":"Financial Analyst\r\n","description":"Financial Analyst\r\n","status":"1"},{"id":"8","name":"Human Resource","description":"Human Resource\r\n","status":"1"},{"id":"9","name":"IT Services\r\n","description":"IT Services\r\n","status":"1"},{"id":"10","name":"Legal Occupations\r\n","description":"Legal Occupations\r\n","status":"1"},{"id":"11","name":"Operations\r\n","description":"Operations\r\n","status":"1"},{"id":"12","name":"Purchase Management\r\n","description":"Purchase Management\r\n","status":"1"},{"id":"13","name":"Sales\r\n","description":"Sales\r\n","status":"1"},{"id":"14","name":"Social Services\r\n","description":"Social Services\r\n","status":"1"},{"id":"15","name":"Student \r\n","description":"Student \r\n","status":"1"},{"id":"16","name":"Other\r\n","description":"Other\r\n","status":"1"}]}';
            const mystring = serverresponse.split('\r\n').join('');
            const result = JSON.parse(mystring);
            var professionList: Profession[] = [];
            if (result['error_code'] === '400') {
                resolve(professionList);
            } else {
                var array: JSON[] = result['profession_list_array'];
                array.forEach(prof => {
                    var profession: Profession = new Profession();
                    profession.id = +prof['id'];
                    profession.name = prof['name'];
                    profession.status = +prof['status'];
                    profession.description = prof['description'];

                    professionList.push(profession);
                });
                resolve(professionList);
            }
        });
        return promise;
    }

    editProfession(name: string, description: string, id: string): Promise<boolean> {
        const postData = {
            'REQUEST_TYPE_SENT': 'SERVICE_EDIT_PROFESSION',
            'name': name,
            'description': description,
            'id': id
        };

        const promise = new Promise<boolean>((resolve, reject) => {
            const serverresponse: string = '{}';
            const result = JSON.parse(serverresponse);
            if (result['error_code'] === '400') {
                resolve(false);
            } else {
                resolve(true);
            }
        });
        return promise;
    }

    addProfession(name: string, description: string): Promise<boolean> {
        const postData = {
            'REQUEST_TYPE_SENT': 'SERVICE_ADD_PROFESSION',
            'name': name,
            'description': description
        };

        const promise = new Promise<boolean>((resolve, reject) => {
            const serverresponse: string = '{}';
            const result = JSON.parse(serverresponse);
            if (result['error_code'] === '400') {
                resolve(false);
            } else {
                resolve(true);
            }
        });
        return promise;
    }

    getEmailTemplates(): Promise<EmailTemplate[]> {
        const postData = {
            'REQUEST_TYPE_SENT': 'SERVICE_EMAIL_TEMPLATE_LIST',
        };

        const promise = new Promise<EmailTemplate[]>((resolve, reject) => {
            const serverresponse: string = '{"email_template_list_array":[{"id":"1","subject":"Registration","body":"\r\nThanks for joining mowize family.</p>\r\n\r\n\r\nYour OTP </strong> for registration is:</p>","template_type":"1","status":"1","admin_user_id":"1"},{"id":"2","subject":"Forgot Password","body":"\r\n\r\nYour one time password to login is:</p>","template_type":"2","status":"1","admin_user_id":"1"},{"id":"3","subject":"Invitation","body":"\r\n\r\nhas shared an asset on Mowize.To see this shared document, you will have to first register with us or Download App</a>.</p>","template_type":"3","status":"1","admin_user_id":"1"},{"id":"4","subject":"Enterprise","body":"\r\n\r\nThanks for showing interest in Mowize.Our executive will get in touch with you shortly.</p>","template_type":"4","status":"1","admin_user_id":"1"},{"id":"5","subject":"Plan Upgradtion","body":"\r\n\r\nYou have successfully Upgraded your plan.</p>\r\n\r\n\r\nYour licence code is :#licence_no </strong></p>\r\n\r\n\r\n </p>\r\n\r\n\r\n* This licence Code can be shared with one more user for upgration of plan.</em></p>","template_type":"5","status":"1","admin_user_id":"1"},{"id":"6","subject":"Invoice Mail","body":"\r\n\r\nHello!\r\nPlease find attached Rent Invoice for the month of #month</p>\r\n\r\n\r\nPdf Attachment</p>\r\n\r\n\r\n\r\nWarm Regards,\r\n#user_name</p>","template_type":"6","status":"1","admin_user_id":"1"},{"id":"7","subject":"Change Device","body":"\r\n\r\nYou have requested to change your device.</p>\r\n\r\n\r\nYour OTP </strong> for update device is:</p>","template_type":"7","status":"1","admin_user_id":"1"}]}';
            const mystring = serverresponse.split('\r\n').join('');
            const result = JSON.parse(mystring);
            var emails: EmailTemplate[] = [];
            if (result['error_code'] === '400') {
                resolve(emails);
            } else {
                var array: JSON[] = result['email_template_list_array'];
                array.forEach(template => {
                    var emailtemplate: EmailTemplate = new EmailTemplate();
                    emailtemplate.id = +template['id'];
                    emailtemplate.subject = template['subject'];
                    emailtemplate.body = template['body'];
                    emailtemplate.templateType = +template['template_type'];
                    emailtemplate.status = +template['status'];
                    emailtemplate.adminStatusId = +template['admin_user_id'];

                    emails.push(emailtemplate);
                });
                resolve(emails);
            }
        });

        return promise;

    }


}
