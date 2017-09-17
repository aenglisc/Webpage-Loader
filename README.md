# Webpage-Loader

[![Code Climate](https://codeclimate.com/github/aenglisc/project-lvl3-s118/badges/gpa.svg)](https://codeclimate.com/github/aenglisc/project-lvl3-s118)
[![Issue Count](https://codeclimate.com/github/aenglisc/project-lvl3-s118/badges/issue_count.svg)](https://codeclimate.com/github/aenglisc/project-lvl3-s118)
[![Test Coverage](https://codeclimate.com/github/aenglisc/project-lvl3-s118/badges/coverage.svg)](https://codeclimate.com/github/aenglisc/project-lvl3-s118/coverage)
[![Build Status](https://travis-ci.org/aenglisc/project-lvl3-s118.svg?branch=master)](https://travis-ci.org/aenglisc/project-lvl3-s118)

An asynchronous webpage downloading utlity

Installation: npm i -g webpage-loader-by-roman

Usage: webpage-loader-by-roman [options] \<url\>

<table style="width:100%">
  <tr>
    <th>Option</th>
    <th>Download location</th>
  </tr>
  <tr>
    <td>no options</td>
    <td>creates /tmp in your current directory</td>
  </tr>
  <tr>
    <td>-o folder-name</td>
    <td>creates /folder-name, relative</td>
  </tr>
  <tr>
    <td>-o /folder-name</td>
    <td>creates /folder-name, absolute</td>
  </tr>
  <tr>
    <td>-o path/to/folder-name</td>
    <td>recursively creates path/to/folder-name, relative</td>
  </tr>
</table>
