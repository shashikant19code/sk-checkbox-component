# orxe-checkbox

Checkbox defines the selecting or deselecting terms and consitions kind of thing where user have to select  or deselect the checkbox .
Checkbox can be defined with single control or It can be the set of the chckboxes where user will have to select the checkboxes according to the need.


## Usage

### Angular / javascript

```html
<!-- Default -->
<orxe-checkbox>
</orxe-checkbox>

<!-- Checkbox with type provided for single checkbox -->
<orxe-checkbox checkboxType="checkbox">
</orxe-checkbox>

<!-- Checkboxgroup with multiple checkboxes  -->
<orxe-checkbox checkboxType="checkboxGroup">
</orxe-checkbox>
```

## Properties

| Property         | Attribute          | Description                                                        | Type      | Default        |
| ---------------- | ------------------ | ------------------------------------------------------------------ | --------- | -------------  |
| `checkboxType`   | `checkbox-type`    | Its two type of checkboxes type either 'checkbox'or'checkboxGroup' | `String`  | `checkbox`     |
| ----------       | -----------        | ------------------------------------------------------------------ | --------  | -------------- |
| `errorMessage`   | `errorMessage`     | Property will show Error message                                   | `String`  | ``             |
