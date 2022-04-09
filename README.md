# `minecraft-sphere` generator

Generate commands that can be used to generate spheres (and cylinders) of any diameter.
     
## Acknowledgements

Without the very helpful information provided by [Henry Cat](https://www.youtube.com/channel/UCEhgXO2ijjwaNXsGce3Dv9A) in the video [How to Make a Sphere in Minecraft Using COMMANDS - Tutorial (Java Edition)](https://www.youtube.com/watch?v=VR-iD5HZzE0&t=102s) none of this would have been possible.

see [Advanced Commands Tutorial - For/While Loops with Minecraft 1.12 Chains](https://www.youtube.com/watch?v=9yX7mhgIhs0) for how to use loops

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



### `blocktypeid` - Block type id

*{`string`}* &ndash; *[default: `''`]*

Minecraft (Java) identifier for the block type


### `blocktypelabel` - Block type label

*{`string`}* &ndash; *[default: `''`]*

The human readable label for the block type to be used to build the sphere


### `centrex` - Centre x

*{`number`}* &ndash; *[default: `0`]*

East/West coordinate for the centre of the sphere


### `centrey` - Centre y

*{`number`}* &ndash; *[default: `0`]*

North/South coordinate for the centre of the sphere


### `centrez` - Centre z

*{`number`}* &ndash; *[default: `0`]*

Vertical coordinate for the centre of the sphere


### `cmdblockheight` - Cmd block height

*{`number`}* &ndash; *[default: `317`]*

The vertical position where command blocks are placed so they don't interfear with other things


### `fillwithair` - Fill with air

*{`boolean`}* &ndash; *[default: `false`]*

Whether or not to fill the object with air as it's being built


### `hmax` - H max

*{`number`}* &ndash; *[default: `9999`]*

Assumed maximum east/west or north/south dimension of world


### `hollowcentre` - Hollow centre

*{`boolean`}* &ndash; *[default: `false`]*

Whether or not to fill the centre of the object with air before starting to generate the object


### `ignorewarnings` - Ignore warnings

*{`boolean`}* &ndash; *[default: `false`]*

Whether or not to render command block generator commands regardless of whether there are warnings


### `length` - Length

*{`number`}* &ndash; *[default: `1`]*

The length/height of a cylinder


### `modifier` - Modifier

*{`number`}* &ndash; *[default: `1`]*

Modify the rate of movement to create spirals. 

> __NOTE:__ Numbers between -1.25 & 1.25 will have little or no effect

> __NOTE ALSO:__ A negitave value will cause the spiral to travel
            counter clockwise

> __FINAL NOTE ALSO:__ numbers between -1 & 1 will always be converted
                 to -1 or 1 to prevent the build slowing down.


### `objecttype` - Object type

*{`string`}* &ndash; *[default: `'sphere'`]*

The type of object to be created.


### `outputmode` - Output mode

*{`number`}* &ndash; *[default: `2`]*

What sort of output do we want from the generator * Options are:
* 1 = Sphere only
* 2 = Either sphere or cylinder (sphere default)
* 3 = Either sphere or cylinder (cylinder default)
* 4 = Cylinder only


### `radius` - Radius

*{`number`}* &ndash; *[default: `0`]*

The radius of the sphere/cylinder


### `showextracomments` - Show extra comments

*{`boolean`}* &ndash; *[default: `false`]*

Whether or not to show extra comments in output


### `slowthreshold` - Slow threshold

*{`number`}* &ndash; *[default: `75`]*

The size of the radius above which rendering the entire sphere might be very slow.


### `stopangle` - Stop angle

*{`number`}* &ndash; *[default: `180`]*

The angle (from vertical *0*) at which the sphere is considered complete


### `thickness` - Thickness

*{`number`}* &ndash; *[default: `1`]*

Thickness of the wall of the sphere/cylinder


### `vmax` - V max

*{`number`}* &ndash; *[default: `320`]*

The maximum vertical distance from zero (either up or down)

