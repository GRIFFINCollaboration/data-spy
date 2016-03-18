## Programmatic Logic

All unpacking is performed by a parser class unique to the data type being unpacked (GRIF-16 fragment, GRIF-16 scalar, PPG or GRIF-4G fragment). Simultaneously, the parser checks for inconsistencies in the data, via the following pattern

 1. Each parser contains an `assessComposition` method, which checks that a valid number of words appear in a valid order in the event; any problems are recorded in the `dataStore` in an array of error messages.

 2. For each word type, the parser contains a function to unpack that word and raise warnings about problems aparent in that word.

 3. Finally, each parser contains a last-pass function `postProcessingFlags` to check for any inconsistencies apparent after unpacking is complete.


## List of Sanity Checks

### GRIF-16 Fragments

#### Event-Level

 - must have at least 10 words
 - first word must start with 0x8
 - second word must start with 0xD
 - third word must start with 00
 - fourth word must start with 0
 - type V must start with 0x9
 - type VI must start with 0xA
 - type VII must start with 0xB
 - allow a run of type VIIa words
 - type VIII must start with 0
 - type IX must start with 0
 - type X must start with 0xE
 - type X word must be last word in event

#### Word-Level

 - **Type I**
  - Must have valid module code
  - Number of words reported in header must match actual number of words (excluding type VIIa)
  - Must have valid detector code
 - **Type III**
  - Make sure there are no type VIIa words if the waveform bit is unset, or the converse.
 - **Type VI & IX**
  - Timestamp low bits and CFD time should be within 10k units of each other.

### GRIF-4G Fragments

Analogous to GRIF-16 Fragments.

### PPG

#### Event-Level

 - must have 7 words
 - each word must have the correct type flag, in order

#### Word-Level

 - **Type I**
  - Must have valid module code
  - Must have valid detector code

### Scalers

#### Event-Level

 - must have at least 5 words
 - each word must have the correct type flag, in order

#### Word-Level

 - **Type I**
  - Must have valid module code
