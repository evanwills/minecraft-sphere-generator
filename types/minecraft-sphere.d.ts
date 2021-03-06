import { LitElement, TemplateResult } from 'lit';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class MinecraftSphere extends LitElement {
    /**
     * The radius of the sphere/cylinder
     */
    radius: number;
    /**
     * Thickness of the wall of the sphere/cylinder
     */
    thickness: number;
    /**
     * The length/height of a cylinder
     */
    length: number;
    /**
     * The human readable label for the block type to be used to build
     * the sphere
     */
    blockTypeLabel: string;
    /**
     * Minecraft (Java) identifier for the block type
     */
    blockTypeID: string;
    /**
     * East/West coordinate for the centre of the sphere
     */
    centreX: number;
    /**
     * North/South coordinate for the centre of the sphere
     */
    centreY: number;
    /**
     * Vertical coordinate for the centre of the sphere
     */
    centreZ: number;
    /**
     * The maximum vertical distance from zero (either up or down)
     */
    vMax: number;
    /**
     * Assumed maximum east/west or north/south dimension of world
     */
    hMax: number;
    /**
     * The size of the radius above which rendering the entire sphere
     * might be very slow.
     */
    slowThreshold: number;
    /**
     * What sort of output do we want from the generator
     *
     * Options are:
     * * 1 = Sphere only
     * * 2 = Either sphere or cylinder (sphere default)
     * * 3 = Either sphere or cylinder (cylinder default)
     * * 4 = Cylinder only
     */
    outputMode: number;
    /**
     * Whether or not to render command block generator commands
     * regardless of whether there are warnings
     */
    ignoreWarnings: boolean;
    /**
     * Whether or not to show extra comments in output
     */
    showExtraComments: boolean;
    /**
     * Whether or not to fill the object with air as it's being built
     */
    fillWithAir: boolean;
    /**
     * Whether or not to fill the centre of the object with air before
     * starting to generate the object
     */
    hollowCentre: boolean;
    /**
     * The type of object to be created.
     */
    objectType: string;
    /**
     * The angle (from vertical *0*) at which the sphere is considered
     * complete
     */
    stopAngle: number;
    /**
     * The vertical position where command blocks are placed so they
     * don't interfear with other things
     */
    cmdBlockHeight: number;
    private _warningMsgs;
    radiusError: string;
    thicknessError: string;
    private _warningCount;
    private _errorCount;
    private _showCode;
    private _filteredBlocks;
    private _doSphere;
    private _doInit;
    private _rMin;
    static styles: import("lit").CSSResult;
    /**
     * Set warning messages generated by user inputs being outside of
     * acceptable limits
     */
    private _setWarnings;
    /**
     * Do basic initialisation stuff...
     *
     * Mostly validating attribute values and doing anything that would
     * normally be triggered by user input
     */
    private _init;
    /**
     * Check whether or not it's OK to generate output code
     *
     * @return TRUE if it's OK to generate code. FALSE otherwise
     */
    private _canGenerate;
    /**
     * Get a formatted minecraft command or, (if extra comments are
     * turned on) a helper comment or empty string (if extra comments
     * are turned off).
     *
     * @param input  Input comment or Minecraft Command
     * @param output comment string or Minecraft setblock with command
     *               embedded.
     * @param chain  String to be modified if output is a command.
     *
     * @returns Object containing the (possibly) updated chain string
     *          and string to append to output.
     */
    private _getCmdCmnt;
    /**
     * Get the horizontal & vertical rotion angles
     *
     * @param {boolean} floor  Whether or not to use floor or ceil to
     *                         round the output values
     *
     * @returns {IRotation} The horizontal & vertical rotations to use
     *                      after setting every (inner) block
     */
    private _getRotation;
    /**
     * Get the x, y & z coordinates for the first command block
     *
     * @returns Coordinates for the first command block
     */
    private _getFirstBlock;
    /**
     * Get the x, y & z coordinates for the centre of the sphere or
     * centre of the start of the cylinder
     *
     * @returns
     */
    private _getCentre;
    /**
     * Get the x, y & z coordinates for the centre of the sphere or
     * centre of the start of the cylinder
     *
     * @returns
     */
    private _getFillCentre;
    /**
     * Generate all the commands (and comments) needed to do all the
     * work to generate object
     *
     * __NOTE:__ This method does not generate the commands that the
     *           command blocks execute. It only wraps the commands in
     *           setblock commands.
     *           It does add a (optional) TP command to teleport you to
     *           where the command blocks are set so you can see what's
     *           going on. Plus a fill command to clear all the command
     *           blocks & redstone power blocks to end the generation
     *           process.
     *
     * @param firstBlock   Coordinates for the position of first command
     *                     block
     * @param commands     List of commands that need to be generated
     * @param totalRepeats The total number of times the commands have
     *                     to be run in each repeat cycle.
     *                     (Used for working out how many times the
     *                      commands need to be cloned)
     * @param oneoffs      List of commands that are only executed once
     *
     * @returns Plain text of all the commands (in order of execution)
     *          plus any comments to help identify what each command is
     *          for.
     */
    private _generateSetBlocks;
    /**
     * Generate the list of commands used for generating a sphere
     *
     * @param {ICoodinates} centre       Coordinates for the centre of
     *                                   the sphere
     * @param {number}      radius       Radius of the sphere
     * @param {number}      thickness    Thickness of the wall of the
     *                                   sphere
     * @param {string}      blockTypeID  ID of block type to build the
     *                                   sphere
     * @param {boolean}     fillWithAir  Fill the inside of the sphere
     *                                   with air
     * @param {boolean}     hollowCentre Make sure the centre of the
     *                                   sphere is hollow
     * @param {number}      stopAngle    The angle (from straight up)
     *                                   at which stop generating the
     *                                   sphere
     *
     * @returns {string} List of commands to run in Minecraft
     */
    private _generateSphere;
    /**
     * Generate the list of commands used for generating a cylinder
     *
     * @param {ICoodinates} centre       Coordinates for the centre of
     *                                   the sphere
     * @param {number}      radius       Radius of the sphere
     * @param {number}      thickness    Thickness of the wall of the
     *                                   sphere
     * @param {string}      blockTypeID  ID of block type to build the
     *                                   sphere
     * @param {boolean}     fillWithAir  Fill the inside of the sphere
     *                                   with air
     * @param {boolean}     hollowCentre Make sure the centre of the
     *                                   sphere is hollow
     * @param {number}      length       The angle (from straight up)
     *                                   at which stop generating the
     *                                   sphere
     * @param {number}      zAngle       The angle from straight up for
     *                                   building direction of the
     *                                   cylinder
     * @param {number}      xyAngle      Horizontal angle for building
     *                                   the direction the cylinder
     *
     * @returns {string} List of commands to run in Minecraft
     */
    private _generateCylinder;
    /**
     * Filter the list of available Minecraft block types using the
     * supplied string
     *
     * @param {string} value User or attribute supplied value for
     *                       Minecraft block type
     *
     * @returns {string} The label for the matched block type or the
     *                   original input if no block could be matched
     */
    private _filterBlockListInner;
    /**
     * Create a filtered list of block that match the string entered
     * into block type
     *
     * @param e User initiated event
     */
    private _filterBlockList;
    /**
     * Handle general user initiated changes & clicks
     *
     * @param e User initiated event
     */
    changeHandler(e: Event): void;
    renderWarnings(msgs: Array<string>): TemplateResult | string;
    /**
     * Get a single radio button field & label
     *
     * @param {label}   label   Label for the input field
     * @param {number} value Value for the input field
     * @param {boolean} checked Whether or not the box should be checked
     *
     * @returns {TemplateResult}
     */
    renderRadioBtn(label: string, value: number, checked: boolean): TemplateResult;
    /**
     * Get a single checkbox field & label
     *
     * @param {string}  id      ID of the input field
     * @param {label}   label   Label for the input field
     * @param {boolean} checked Whether or not the box should be checked
     *
     * @returns {TemplateResult}
     */
    renderCbBtn(id: string, label: string, checked: boolean, title?: string): TemplateResult;
    /**
     * Get a numeric input filed & label
     *
     * @param {string} id          ID of the input field
     * @param {label}  label       Label for the input field
     * @param {number} value       Value for the input field
     * @param {number} min         Minimum allowed value for the field
     * @param {number} max         Maximum allowed value for the field
     * @param {number} warnings    Warning message for this field
     * @param {string} description Helpful info about the purpose of
     *                             the field
     *
     * @returns {TemplateResult}
     */
    renderNumInput(id: string, label: string, value: number, min: number, max: number, warnings: Array<string>, description?: string): TemplateResult;
    /**
     * Render the HTML for all the user input fields needed to get the
     * data to generate the code blocks
     *
     * @returns {TemplateResult}
     */
    renderInputs(): TemplateResult;
    /**
     * Render the HTML to show the output this component generated
     *
     * @returns {TemplateResult} A textarea containing the commands
     *                           (and instructions) the user needs
     */
    renderCode(): TemplateResult;
    /**
     * The main render function for this component
     *
     * @returns {TemplateResult}
     */
    render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'minecraft-sphere': MinecraftSphere;
    }
}
