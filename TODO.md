# TODO for @teqfw/i18n

## Re-scan i18n resources for separate plugins

We need an option in `./cfg/local.xml`:

```json
{
  "i18n": {
    "forceScan": ["@scope/project"]
  }
}
```

To rescan i18n resources for some plugins only. There is one global option `/core/devMode` to control this behaviour.
