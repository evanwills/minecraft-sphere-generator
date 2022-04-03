# `minecraft-sphere` generator

Generate commands that can be used to generate spheres (and cylinders) of any diameter.
     
## Acknowledgements

Without the very helpful information provided by [Henry Cat](https://www.youtube.com/channel/UCEhgXO2ijjwaNXsGce3Dv9A) in the video [How to Make a Sphere in Minecraft Using COMMANDS - Tutorial (Java Edition)](https://www.youtube.com/watch?v=VR-iD5HZzE0&t=102s) none of this would have been possible.

## How the generator works:

1. * Search for the type of block you wish to make your sphere out 
     of (current list is from Minecraft Jave V1.16)
   * Specify the radius of the sphere
   * Specify the thickness of the sphere (default 1 block)
   * Specify the coordinates of the centre of the sphere
   * (If there are warnings, decide whether you are happy to ignore them)
   * Click "Generate"
2. * Copy & paste the commands listed into the chat box one-by-one. <br />
     > __Note:__ the very last one terminates the build process so 
     > only execute that one when you're happy with the build

## TODO:

1. Make sure output basic code does what it should for spheres
2. Add auto terminate logic when sphere is done 
    test whether play is facing straight down (-90)
3. Get logic working for Cylinders
4. Make sure there's a space to stand to build the object
5. Make code work for boring out spaces under ground.
6. Make code for creating horzontal tubes and boring horizontal holes in an arbitrary direction.
7. Make code for creating 

## Disclaimer

This component is in the early stages of development. I still need to do further testing to make sure it does what I want.



## Web component attributes

### `blockTypeID`

*{`string`}* &ndash; *[default: `''`]*

Minecraft (Java) identifier for the block type


### `blockTypeLabel`

*{`string`}* &ndash; *[default: `''`]*

The human readable label for the block type to be used to build the sphere


### `centreX`

*{`number`}* &ndash; *[default: `0`]*

East/West coordinate for the centre of the sphere


### `centreY`

*{`number`}* &ndash; *[default: `0`]*

North/South coordinate for the centre of the sphere


### `centreZ`

*{`number`}* &ndash; *[default: `0`]*

Vertical coordinate for the centre of the sphere


### `hMax`

*{`number`}* &ndash; *[default: `9999`]*

Assumed maximum east/west or north/south dimension of world


### `height`

*{`number`}* &ndash; *[default: `1`]*

The height of a cylinder


### `ignoreWarnings`

*{`boolean`}* &ndash; *[default: `false`]*

Whether or not to render command block generator commands regardless of whether there are warnings


### `objecType`

*{`string`}* &ndash; *[default: `'sphere'`]*

The type of object to be created.


### `outputMode`

*{`number`}* &ndash; *[default: `1`]*

What sort of output do we want from the generator 

Options are:
   * 1 = Either sphere or cylinder
   * 2 = Sphere only
   * 3 = Cylinder only


### `radius`

*{`number`}* &ndash; *[default: `0`]*

The radius of the sphere/cylinder


### `showExtraComments`

*{`boolean`}* &ndash; *[default: `false`]*

Whether or not to show extra comments in output


### `slowThreshold`

*{`number`}* &ndash; *[default: `75`]*

The size of the radius above which rendering the entire sphere might be very slow.


### `stopAngle`

*{`number`}* &ndash; *[default: `-90`]*

The angle (from vertical *0*) at which the sphere is considered complete


### `thickness`

*{`number`}* &ndash; *[default: `1`]*

Thickness of the wall of the sphere/cylinder


### `vMax`

*{`number`}* &ndash; *[default: `320`]*

The maximum vertical distance from zero (either up or down)
