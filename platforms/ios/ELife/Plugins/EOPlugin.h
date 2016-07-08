//
//  EOPlugin.h
//  HelloCordova
//
//  Created by penwen on 16/6/7.
//
#import <Cordova/CDVPlugin.h>
@interface EOPlugin : CDVPlugin

- (void)myMethod:(CDVInvokedUrlCommand*)command;
@end