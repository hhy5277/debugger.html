/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at <http://mozilla.org/MPL/2.0/>. */

// @flow

import { PROMISE } from "../utils/middleware/promise";
import { recordEvent } from "../../utils/telemetry";
import type { ThunkArgs } from "../types";

/**
 *
 * @memberof actions/pause
 * @static
 */
export function pauseOnExceptions(
  shouldPauseOnExceptions: boolean,
  shouldPauseOnCaughtExceptions: boolean
) {
  return ({ dispatch, client }: ThunkArgs) => {
    /* eslint-disable camelcase */
    recordEvent("pause_on_exceptions", {
      exceptions: shouldPauseOnExceptions,
      // There's no "n" in the key below (#1463117)
      caught_exceptio: shouldPauseOnCaughtExceptions
    });
    /* eslint-enable camelcase */

    return dispatch({
      type: "PAUSE_ON_EXCEPTIONS",
      shouldPauseOnExceptions,
      shouldPauseOnCaughtExceptions,
      [PROMISE]: client.pauseOnExceptions(
        shouldPauseOnExceptions,
        shouldPauseOnCaughtExceptions
      )
    });
  };
}
