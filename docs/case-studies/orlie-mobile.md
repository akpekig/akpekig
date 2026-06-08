# Orlie Mobile — Cross-Platform Screen-Time Management App

<div class="flex flex-wrap gap-1 my-2">
<div class="badge badge-secondary mb-4">React Native</div>
<div class="badge badge-secondary mb-4">Swift</div>
<div class="badge badge-secondary mb-4">Objective-C</div>
<div class="badge badge-secondary mb-4">C/C++</div>
<div class="badge badge-secondary mb-4">AWS</div>
<div class="badge badge-secondary mb-4">Stripe</div>
<div class="badge badge-secondary mb-4">React Native CLI</div>
</div>

## Problem

A research-backed startup required a mobile app that could blend screen-time reduction techniques with telecoms billing. Apple provides no public documentation for its Screen Time framework, making feature parity between iOS and Android extremely difficult.

## Outcome

Promoted to Lead Engineer within the first month. Led a small team of full-stack and mobile engineers. Reverse-engineered Apple's undocumented Screen Time framework in C/Obj-C to match the existing Android functionality exactly, both in logic and appearance. Also began extracting a standalone React Native library to bridge screen-time analytics across platforms, along with native-first gradient text components.

## Code Sample — Reverse-engineered Screen Time bridge

The native module wraps undocumented iOS APIs and exposes them to React Native via the bridge:

```objc
// ScreenTimeBridge.m
#import "ScreenTimeBridge.h"
@import FamilyControls;
@import ManagedSettings;

@implementation ScreenTimeBridge

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(fetchUsageData:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  if (@available(iOS 15.0, *)) {
    // Undocumented API exploration to extract usage statistics
    // Wrapped and sanitised for React Native consumption
    NSError *error = nil;
    NSDictionary *usageData = [self retrieveUsageDataWithError:&error];
    if (usageData) {
      resolve(usageData);
    } else {
      reject(@"no_data", @"Could not retrieve usage data", error);
    }
  } else {
    reject(@"unsupported", @"iOS version too low", nil);
  }
}

@end
```
