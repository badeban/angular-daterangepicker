# Date Range Picker for Angular and Bootstrap

Angular.js directive for Dan Grossmans's [Bootstrap Datepicker](https://github.com/dangrossman/bootstrap-daterangepicker).

**Beware: Use [Bootstrap Datepicker](https://github.com/dangrossman/bootstrap-daterangepicker) v 2.0.0 and newer!

![Date Range Picker screenshot](http://i.imgur.com/zDjBqiS.png)

## Installation via NPM
The easiest way to install the picker is:
```
npm install git+https://github.com/DaniVarga/angular-daterangepicker.git --save
```

This directive depends on [Bootstrap Datepicker](https://github.com/dangrossman/bootstrap-daterangepicker), [Bootstrap](http://getbootstrap.com), [Moment.js](http://momentjs.com/) and [jQuery](http://jquery.com/).
The dependencies should be satisfied in the host project,. See demo for example.

Declare dependency:

```
App = angular.module('app', ['angular-bsdaterangepicker']);
```

Prepare model in your controller. The model **should** have `startDate` and `endDate` attributes:

```
exampleApp.controller('TestCtrl', function ($scope) {
	$scope.datePicker.date = {startDate: null, endDate: null};
}
```


Then in your HTML just add attribute `date-range-picker` to any input and bind it to model.

```
<div ng-controller="TestCtrl">
<input date-range-picker class="form-control date-picker" type="text" ng-model="datePicker.date" />
</div>
```

See `example.html` for working demo.

## Advanced usage
Min and max value can be set via additional attributes:

```
<input date-range-picker class="form-control date-picker" type="text" ng-model="date" min="'2014-02-23'" max="'2015-02-25'"/>
```

The date picker can be further customized by passing in the `options` attribute.

```
<input date-range-picker class="form-control date-picker" type="text" ng-model="date"
min="'2014-02-23'" max="'2015-02-25'" options="{separator: ":"}"/>
```

Optionally, event handlers can be passed in through the `eventHandlers` attribute of `options`.

```
<input date-range-picker class="form-control date-picker" type="text" ng-model="date"
options="{eventHandlers: {'show.daterangepicker': function(ev, picker) { ... }}}"/>
```

All event handlers from the Bootstrap daterangepicker are supported. For reference, the complete list is below:

`show.daterangepicker`: Triggered when the picker is shown

`hide.daterangepicker`: Triggered when the picker is hidden

`showCalendar.daterangepicker`: Triggered when the calendar is shown

`hideCalendar.daterangepicker`: Triggered when the calendar is hidden

`apply.daterangepicker`: Triggered when the apply button is clicked

`cancel.daterangepicker`: Triggered when the cancel button is clicked

## Compatibility
Version > 0.2.0 requires [Bootstrap Datepicker](https://github.com/dangrossman/bootstrap-daterangepicker) 2.0.0 and newer.

## Links
See [original documentation](https://github.com/dangrossman/bootstrap-daterangepicker).

## Issues and Pull Requests
The PRs are more than welcome – thank you for those.

