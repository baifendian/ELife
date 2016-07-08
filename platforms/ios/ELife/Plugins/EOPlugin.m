#import "EOPlugin.h"
#import <LocalAuthentication/LocalAuthentication.h>
@implementation EOPlugin
- (void)myMethod:(CDVInvokedUrlCommand*)command
{
   
    CDVPluginResult* pluginResult = nil;
    NSString* myarg = [command.arguments objectAtIndex:0];
    if (myarg != nil) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Arg was null"];
    }
    

    LAContext* context = [[LAContext alloc] init];
    
    NSError* error = nil;
    NSString* result = @"需要您的指纹进行识别";
    context.localizedFallbackTitle = @"输入密码";
    NSLog(@"data before authentication = %@",[context evaluatedPolicyDomainState]);
    
    // 首先使用canEvaluatePolicy 判断设备支持状态
    if ([context canEvaluatePolicy:LAPolicyDeviceOwnerAuthentication error:&error]) {
        // 支持指纹验证
        [context evaluatePolicy:LAPolicyDeviceOwnerAuthentication localizedReason:result reply:^(BOOL success, NSError *error) {
            if (success) {
                //验证成功，主线程处理UI
                NSLog(@"验证成功...");
                [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                NSLog(@"data after authentication = %@",[context evaluatedPolicyDomainState]);
            }else{
                NSLog(@"%@",error.localizedDescription);
                switch (error.code) {
                    case LAErrorSystemCancel:
                    {
                        NSLog(@"Authentication was cancelled by the system");
                        //切换到其他APP，系统取消验证Touch ID
                        break;
                    }
                    case LAErrorUserCancel:
                    {
                        NSLog(@"Authentication was cancelled by the user");
                        //用户取消验证Touch ID
                        break;
                    }
                    case LAErrorUserFallback:
                    {
                        NSLog(@"User selected to enter custom password");
                        [[NSOperationQueue mainQueue] addOperationWithBlock:^{
                            //用户选择输入密码，切换主线程处理
                        }];
                        break;
                    }
                    case LAErrorAuthenticationFailed:
                    {
                        NSLog(@"Authentication Failed");
                        break;
                    }
                    case LAErrorTouchIDLockout:
                    {
                        NSLog(@"TOUCH ID is locked out");
                        break;
                    }
                    case LAErrorAppCancel:
                    {
                        NSLog(@"app cancle the authentication");
                        break;
                    }
                    case LAErrorInvalidContext:
                    {
                        NSLog(@"context is invalidated");
                        break;
                    }
                    default:
                    {
                        [[NSOperationQueue mainQueue] addOperationWithBlock:^{
                            //其他情况，切换主线程处理
                        }];
                        break;
                    }
                }
            }
        }];
    }else {
        NSLog(@"%@",error.localizedDescription);
        //不支持指纹识别，LOG出错误详情
        switch (error.code) {
            case LAErrorTouchIDNotEnrolled:
            {
                NSLog(@"TouchID is not enrolled");
                break;
            }
            case LAErrorPasscodeNotSet:
            {
                NSLog(@"A passcode has not been set");
                break;
            }
            default:
            {
                NSLog(@"TouchID not available");
                break;
            }
        }
    }

    
    
    
}

@end