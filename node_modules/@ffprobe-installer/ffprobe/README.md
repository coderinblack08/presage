# node-ffprobe-installer

[![npm](https://img.shields.io/npm/dt/@ffprobe-installer/ffprobe.svg?style=flat-square)](https://www.npmjs.com/package/@ffprobe-installer/ffprobe) [![npm](https://img.shields.io/npm/v/@ffprobe-installer/ffprobe.svg?style=flat-square)](https://www.npmjs.com/package/@ffprobe-installer/ffprobe?activeTab=versions) [![xo](https://img.shields.io/badge/code%20style-XO-60CFBE.svg?longCache=true&style=flat-square&logo=)](https://github.com/xojs/xo)

[![Travis](https://img.shields.io/travis/SavageCore/node-ffprobe-installer.svg?style=flat-square)](https://travis-ci.org/SavageCore/node-ffprobe-installer/) [![AppVeyor](https://img.shields.io/appveyor/ci/SavageCore/node-ffprobe-installer.svg?style=flat-square)](https://ci.appveyor.com/project/SavageCore/node-ffprobe-installer) [![Codecov](https://img.shields.io/codecov/c/github/SavageCore/node-ffprobe-installer.svg?style=flat-square)](https://codecov.io/gh/SavageCore/node-ffprobe-installer/) [![Tidelift](https://tidelift.com/badges/github/SavageCore/node-ffprobe-installer?style=flat-square)](https://tidelift.com/repo/github/SavageCore/node-ffprobe-installer/)

Platform independent binary installer of [FFprobe](https://ffmpeg.org/) for node projects. Useful for tools that should "just work" on multiple environments.

Installs a binary of `ffprobe` for the current platform and provides a path and version. Supports Linux, Windows 7+ and MacOS 10.9+.

A combination of package.json fields `optionalDependencies`, `cpu`, and `os` let's the installer only download the binary for the current platform. See also [Warnings during install](https://github.com/SavageCore/node-ffprobe-installer/blob/master/README.md#warnings-during-install).

## Install

    npm install --save @ffprobe-installer/ffprobe

## Usage examples

```javascript
const ffprobe = require('@ffprobe-installer/ffprobe');
console.log(ffprobe.path, ffprobe.version);
```

### [process.spawn()](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)

```javascript
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const spawn = require('child_process').spawn;
const ffprobe = spawn(ffprobePath, args);
ffprobe.on('exit', onExit);
```

### [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)

```javascript
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfprobePath(ffprobePath);
```

## Warnings during install

To automatically choose the binary to install, [optionalDependencies](https://docs.npmjs.com/files/package.json#optionaldependencies) are used. This currently outputs warnings in the console, an issue for that is [tracked by the npm team here](https://github.com/npm/npm/issues/9567).

## Known Issues

### AWS and/or Elastic Beanstalk

If you get permissions issues, try adding a .npmrc file with the following:

    unsafe-perm=true

See [node-ffmpeg-installer/issues/21](https://github.com/kribblo/node-ffmpeg-installer/issues/21)

### Wrong path under Electron with Asar enabled

It's a [known issue](https://github.com/electron-userland/electron-packager/issues/740) that Asar breaks native paths. As a workaround, if you use Asar, you can do something like this:

```javascript
const ffprobePath = require('@ffprobe-installer/ffprobe').path.replace(
	'app.asar',
	'app.asar.unpacked'
);
```

## The binaries

Downloaded from the sources listed at [ffmpeg.org](https://ffmpeg.org/download.html):

- Linux (20190527-g9b069eb14e): https://www.johnvansickle.com/ffmpeg/
- MacOS (93939-g819ed1df94): https://evermeet.cx/ffmpeg/
- Windows 32-bit (20190529-d903c09): https://ffmpeg.zeranoe.com/builds/win32/static/
- Windows 64-bit (20190529-d903c09): https://ffmpeg.zeranoe.com/builds/win64/static/
- Linux ARM (release: 4.3.1) :   https://www.johnvansickle.com/ffmpeg/
For version updates, submit issue or pull request.

## Upload new versions

In every updated `platforms/*` directory:

    npm run upload

## See also

- [node-ffmpeg-installer](https://www.npmjs.com/package/@ffmpeg-installer/ffmpeg) - This project is a fork of ffmpeg-installer
