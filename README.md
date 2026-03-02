# REST Countries Automated Test and Application

## Overview

The repo consist of two parts:

1. Test Automation (Jest)
2. Console Application Development (Call Routing Helper)

The project uses the REST Countries API as the data source.

## API Used

REST Countries (v3.1)  
Endpoint: `https://restcountries.com/v3.1/all`

---

## Part 1 — Test Automation
Jest are used for test automation in this repo.

### Scenario 1: Confirmation of Countries
This test calls the `/all` endpoint and validates total count of countries provided by the API.

**Assumptions**
- Total number of countries are based on ISO 3166 which are 249 countries

### Scenario 2: Validate Languages
This test to validate if SASL is part of South Africa language

**Assumptions**
- South African Sign Language should be part of list of South Africa language and its called as SASL
  
### Scenario 3: Validate Max Fields
This test validates the requirement that responses should be constrained to a maximum of 10 fields (bandwidth control expectation). It checks that the request strategy used in the solution limits the returned fields to the required subset and that the resulting objects do not exceed the expected number of properties.

**Assumptions**
- Test should fail if more than 10 fields requested
- Test should pass if 0-10 fields requested

---

## Part 2 — Console Application (Call Routing Helper)

A console program that takes:
- Origin country (caller country) in any format (common name, native names, cca2 or cca3 code)
- Origin time in 24-hour format (`HH:MM`)

Returns a list of countries that:
- share the same language as the origin country, and
- are currently within working hours (09:00–17:00) in their local time

### How it works (high level)
1. Get input country and time from user via console prompt.
2. List out all countries that has similar language
3. Filter out countries that are in working hour

**Assumptions**
- Each country has a single time zone.
- Everyday is working day only working hours are considered in the logic.

---

## Setup

### Install dependencies
npm -install

## Run Application

### Test Automation
npm test

### Call Routing Application
node src/index.js

