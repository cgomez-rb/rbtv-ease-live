// swift-tools-version:5.7
import PackageDescription

let package = Package(
    name: "EaseLive",
    products: [
        .library(
            name: "EaseLiveSDK",
            targets: ["EaseLiveSDK"]),
    ],
    targets: [
        .binaryTarget(
            name: "EaseLiveSDK",
            path: "Binary/EaseLiveSDK.xcframework"
        )
    ]
)