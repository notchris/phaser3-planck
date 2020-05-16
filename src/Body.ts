/**
 * Our custom body class to keep things as in line with phasers api as possible.
 * should we make our own class or extends Plancks class :thinking:
 */

import * as Planck from 'planck-js'

class Body {
  planckBody: Planck.Body

  constructor(body: Planck.Body, isDynamic: boolean) {
    
    // this is the internal planck body as this class is only for a custom api
    this.planckBody = body
  }
}

export default Body