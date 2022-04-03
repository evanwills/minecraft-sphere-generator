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
     * The height of a cylinder
     */
    height: number;
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
     * * 1 = Either sphere or cylinder
     * * 2 = Sphere only
     * * 3 = Cylinder only
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
     * The type of object to be created.
     */
    objecType: string;
    /**
     * The angle (from vertical *0*) at which the sphere is considered
     * complete
     */
    stopAngle: number;
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
     * @param {number}  radius The radius of the sphere/cylinder
     * @param {boolean} floor  Whether or not to use floor or ceil to
     *                         round the output values
     *
     * @returns {IRotation} The horizontal & vertical rotations to use
     *                      after setting every (inner) block
     */
    private _getRotation;
    private _generateSetBlocks;
    /**
     * Generate the commands used for generating a sphere
     *
     * @param {ICoodinates} centre      Coordinates for the centre of
     *                                  the sphere
     * @param {number}      radius      Radius of the sphere
     * @param {number}      thickness   Thickness of the wall of the
     *                                  sphere
     * @param {string}      blockTypeID ID of block type to build the
     *                                  sphere
     *
     * @returns {string} List of commands to run in Minecraft
     */
    private _generateSphere;
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
    renderCbBtn(id: string, label: string, checked: boolean): TemplateResult;
    /**
     * Get a numeric input filed & label
     *
     * @param {string} id    ID of the input field
     * @param {label}  label Label for the input field
     * @param {number} value Value for the input field
     * @param {number} min   Minimum allowed value for the field
     * @param {number} max   Maximum allowed value for the field
     *
     * @returns {TemplateResult}
     */
    renderNumInput(id: string, label: string, value: number, min: number, max: number, warnings: Array<string>): TemplateResult;
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