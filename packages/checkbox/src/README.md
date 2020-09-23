# orxe-checkbox

Cards define the visual boundary which should hold the specified set of information. Cards in ORXe 3 are used to group a set of data or content, belonging to a specific use case or user action.

## Usage

### Angular / javascript

```html
<!-- Default -->
<orxe-checkbox>
  <div>
    Here is the card content
  </div>
</orxe-checkbox>

<!-- Floating card  -->
<orxe-checkbox card-type="floating-card">
  <div>
    Here is the card content
  </div>
</orxe-checkbox>

<!-- Floating card with close icon  -->
<orxe-checkbox card-type="floating-card" close-icon a11y-close-label="card closed">
  <div>
    Here is the card content
  </div>
</orxe-checkbox>
```

## Properties

| Property         | Attribute          | Description                                                        | Type      | Default        |
| ---------------- | ------------------ | ------------------------------------------------------------------ | --------- | -------------- |
| `cardType`       | `card-type`        | It takes two type of card either 'default-card' or 'floating-card' | `String`  | `default-card` |
| ----------       | -----------        | ------------------------------------------------------------------ | --------  | -------------- |
| `closeIcon`      | `close-icon`       | Property will show the close icon on the `floating card`           | `Boolean` | `false`        |
| ----------       | -----------        | ------------------------------------------------------------------ | --------  | -------------- |
| `a11yCloseLabel` | `a11y-close-label` | Property will set the aria-label for close button                  | `String`  | -------------- |
| `Close The Card` | -----------        | ------------------------------------------------------------------ | --------  | -------------- |
