'use strict';
/**
 * @ngdoc function
 * @name armsAngularApp.controller:AppointmentsRequestTableCtrl
 * @description
 * # AppointmentsRequestTableCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
<<<<<<< HEAD
  .controller('RequestTableCtrl', [
    '$rootScope',
    '$scope',
    'appointmentDataService',
    'DTOptionsBuilder',
    'DTColumnBuilder',
    '$q',
    'moment',
    function($rootScope, $scope, appointmentDataService, DTOptionsBuilder, DTColumnBuilder, $q, moment) {
      var vm = this;
      var user = $rootScope.user;
      console.log(appointmentDataService);

      vm.dtOptions = DTOptionsBuilder
        .fromFnPromise(function() {
          return promiseFunc();
        })
        // Add Bootstrap compatibility
        .withBootstrap();
      vm.dtColumns = [
        DTColumnBuilder.newColumn('appointmentDate').withTitle('Date').renderWith(function(data, type, full) {
          return moment(full.appointmentDate).format("MMM-DD");
        }),
        DTColumnBuilder.newColumn('TimeSlot.fromTime').withTitle('Start Time').renderWith(function(data, type, full) {
          return moment(full.TimeSlot.fromTime, 'HH:mm:ss').format("hh:mm A");
        }),
        DTColumnBuilder.newColumn('TimeSlot.toTime').withTitle('End Time').renderWith(function(data, type, full) {
          return moment(full.TimeSlot.toTime, 'HH:mm:ss').format("hh:mm A");
        }),
        DTColumnBuilder.newColumn('appointmentTitle').withTitle('Title'),
        DTColumnBuilder.newColumn('approved').withTitle('Status').renderWith(function(data, type, full) {
          var st;
          if (full.approved == true) {
            return '<span class="label label-success">Approved</span>';
          } else {
            return '<span class="label label-warning">Pending</span>';
          }
        }),
        DTColumnBuilder.newColumn(null).withTitle('Action').notSortable().renderWith(actionsHtml)
      ];
      vm.newPromise = promiseFunc();
      vm.reloadData = reloadData;
      vm.dtInstance = {};

      function actionsHtml(data, type, full, meta) {
        return '<button class="btn btn-sm btn-danger" ng-click="showCase.delete(showCase.persons[])" )"="">' +
          '   Cancel' +
          '</button>';
      }

      $scope.reload = function() {
        //vm.dtInstance.reloadData();
         appointmentDataService.refreshTables();
      };


      function promiseFunc() {
        var deferred = $q.defer();
        appointmentDataService.getMyAppointments(user).then(function(response) {
          console.log(response.data);
          deferred.resolve(response.data);
        });
        return deferred.promise;
      };

      function reloadData() {
        var resetPaging = true;
        vm.dtInstance.reloadData(callback, resetPaging);
      }

      function callback(json) {
        console.log(json);
      }

      $scope.$on('refreshDataTables', function() {
        console.log('refreshDataTables');
          vm.dtInstance.reloadData();
      });

    }
  ]);
=======
    .controller('RequestTableCtrl', [
        '$scope',
        'DTOptionsBuilder',
        'DTColumnBuilder',
        '$q',
        'appointmentDataservice',
        'moment',
        '$rootScope',
        function($scope,DTOptionsBuilder, DTColumnBuilder, $q, appointmentDataservice, moment, $rootScope) {
            this.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
            
            var lectureTable = this;
            var sudentTable = this;
            var user = $rootScope.user;
            
            /*
                student appointment display table configuration and logic
             */
            var displayStudentAppointmentTable = function() {
                sudentTable.dtOptions = DTOptionsBuilder
                    .fromFnPromise(appointmentDataservice.getPendingRequests().then(function(response) {
                        console.log(response.data)
                        return response.data;
                    }))
                    // Add Bootstrap compatibility
                    .withBootstrap();
                sudentTable.dtColumns = [
                    DTColumnBuilder.newColumn('requestTitle').withTitle('Title').withClass('text-danger'),
                    DTColumnBuilder.newColumn('requestDate').withTitle('Date').renderWith(function(data, type, full) {
                        return moment(full.requestDate).format("MMM-DD");
                    }),
                    DTColumnBuilder.newColumn('requestStartTime').withTitle('Start Time').renderWith(function(data, type, full) {
                        return moment(full.requestStartTime, 'HH:mm:ss').format("hh:mm A");
                    }),
                    DTColumnBuilder.newColumn('requestEndTime').withTitle('End Time').renderWith(function(data, type, full) {
                        return moment(full.requestEndTime, 'HH:mm:ss').format("hh:mm A");
                    }),
                    DTColumnBuilder.newColumn('status').withTitle('Status').renderWith(function(data, type, full) {
                        var st;
                        if (full.status == 'true') {
                            return '<span class="label label-warning">Pending</span>';
                        } else {
                            return '<span class="label label-warning">Pending</span>';
                        }
                    }),
                    DTColumnBuilder.newColumn(null).withTitle('Action').notSortable().renderWith(actionsHtml)
                ];
                function actionsHtml(data, type, full, meta) {
                    return '<button class="btn btn-sm btn-danger" ng-click="showCase.delete(showCase.persons[])" )"="">' +
                        '   Cancel' +
                        '</button>';
                }
            }
            /*
                lecture appointment display table configuration and logic
             */
            var displayLectureAppointmentTable = function() {
                    console.log(JSON.stringify($rootScope.user));
                lectureTable.dtOptions = DTOptionsBuilder
                    .fromFnPromise(appointmentDataservice.getStudentRequests(user).then(function(response) {
                        console.log(response.data)
                        return response.data;
                    }))
                    // Add Bootstrap compatibility
                    .withBootstrap()
                    .withOption('rowCallback', rowCallback);
                lectureTable.dtColumns = [
                    DTColumnBuilder.newColumn('requestTitle').withTitle('Title').withClass('text-danger'),
                    DTColumnBuilder.newColumn('requestDate').withTitle('Date').renderWith(function(data, type, full) {
                        return moment(full.requestDate).format("MMM-DD");
                    }),
                    DTColumnBuilder.newColumn('requestStartTime').withTitle('Start Time').renderWith(function(data, type, full) {
                        return moment(full.requestStartTime, 'HH:mm:ss').format("hh:mm A");
                    }),
                    DTColumnBuilder.newColumn('requestEndTime').withTitle('End Time').renderWith(function(data, type, full) {
                        return moment(full.requestEndTime, 'HH:mm:ss').format("hh:mm A");
                    })
                ];

                function actionsHtml(data, type, full, meta) {
                    return '<button class="btn btn-sm btn-success" ng-click="showCase.delete(showCase.persons[])" )"="">' +
                        '   Make Appointment' +
                        '</button>&nbsp;'+
                        '<button class="btn btn-sm btn-danger" ng-click="showCase.delete(showCase.persons[])" )"="">' +
                        '   Cancel Appointment' +
                        '</button>';
                }

                function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
                    $('td', nRow).unbind('click');
                    $('td', nRow).bind('click', function() {
                        $scope.$apply(function() {
                            someClickHandler(aData);
                        });
                    });
                    return nRow;
                };

                function someClickHandler(info) {
                    appointmentDataservice.passRequestData(info);
                };
            }
            if ($rootScope.user.role == 'lecture') {
                displayLectureAppointmentTable();
            }
            if ($rootScope.user.role == 'student') {
                displayStudentAppointmentTable();
            }

            $scope.$on('refreshDataTables', function() {
                if ($rootScope.user.role == 'lecture') {
                    displayLectureAppointmentTable();
                }
                if ($rootScope.user.role == 'student') {
                    displayStudentAppointmentTable();
                }
            });
        }
    ]);
>>>>>>> 594b813733af20f7fd1990f6d7af4bfd8e2387e3
