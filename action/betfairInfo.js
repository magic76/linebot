module.exports = {
	INVALID_BET_SIZE: 'bet size is invalid for your currency or your regulator',
	INVALID_RUNNER: 'Runner does not exist, includes vacant traps in greyhound racing',
	BET_TAKEN_OR_LAPSED:
		'Bet cannot be cancelled or modified as it has already been taken or has been cancelled/lapsed Includes attempts to cancel/modify market on close BSP bets and cancelling limit on close BSP bets. The error may be returned on placeOrders request if for example a bet is placed at the point when a market admin event takes place (i.e. market is turned in-play)',
	BET_IN_PROGRESS: 'No result was received from the matcher in a timeout configured for the system',
	RUNNER_REMOVED: 'Runner has been removed from the event',
	MARKET_NOT_OPEN_FOR_BETTING: 'Attempt to edit a bet on a market that has closed.',
	LOSS_LIMIT_EXCEEDED: 'The action has caused the account to exceed the self imposed loss limit',
	MARKET_NOT_OPEN_FOR_BSP_BETTING: 'Market now closed to bsp betting. Turned in-play or has been reconciled',
	INVALID_PRICE_EDIT:
		'Attempt to edit down the price of a bsp limit on close lay bet, or edit up the price of a limit on close back bet',
	INVALID_ODDS: 'Odds not on price ladder - either edit or placement',
	INSUFFICIENT_FUNDS:
		'Insufficient funds available to cover the bet action. Either the exposure limit or available to bet limit would be exceeded',
	INVALID_PERSISTENCE_TYPE: 'Invalid persistence type for this market, e.g. KEEP for a non in-play market.',
	ERROR_IN_MATCHER: 'A problem with the matcher prevented this action completing successfully',
	INVALID_BACK_LAY_COMBINATION:
		'The order contains a back and a lay for the same runner at overlapping prices. This would guarantee a self match. This also applies to BSP limit on close bets',
	ERROR_IN_ORDER: 'The action failed because the parent order failed',
	INVALID_BID_TYPE: 'Bid type is mandatory',
	INVALID_BET_ID: 'Bet for id supplied has not been found',

	CANCELLED_NOT_PLACED: 'Bet cancelled but replacement bet was not placed',
	RELATED_ACTION_FAILED: 'Action failed due to the failure of a action on which this action is dependent',
	NO_ACTION_REQUIRED: `the action does not result in any state change. eg changing a persistence to it's current value`,
	TIME_IN_FORCE_CONFLICT: `You may only specify a time in force on either the place request OR on individual limit order instructions (not both),
    since the implied behaviors are incompatible.`,
	UNEXPECTED_PERSISTENCE_TYPE: `You have specified a persistence type for a FILL_OR_KILL order, which is nonsensical because no umatched portion
    can remain after the order has been placed.`,
	INVALID_ORDER_TYPE: 'You have specified a time in force of FILL_OR_KILL, but have included a non-LIMIT order type.',
	UNEXPECTED_MIN_FILL_SIZE: `You have specified a minFillSize on a limit order, where the limit order's time in force is not FILL_OR_KILL.
    Using minFillSize is not supported where the time in force of the request (as opposed to an order) is FILL_OR_KILL.`,
	INVALID_CUSTOMER_ORDER_REF: 'The supplied customer order reference is too long.',
	INVALID_MIN_FILL_SIZE: `The minFillSize must be greater than zero and less than or equal to the order's size.
	The minFillSize cannot be less than the minimum bet size for your currency`,

	PROCESSED_WITH_ERRORS:
		'The order itself has been accepted, but at least one (possibly all) actions have generated errors',

	BET_ACTION_ERROR:
		'There is an error with an action that has caused the entire order to be rejected. Check the instructionReports errorCode for the reason for the rejection of the order.',

	INVALID_ACCOUNT_STATE: `Order rejected due to the account's status (suspended, inactive, dup cards)`,

	INVALID_WALLET_STATUS: `Order rejected due to the account's wallet's status`,

	MARKET_SUSPENDED: 'Market is suspended',

	DUPLICATE_TRANSACTION:
		'Duplicate customer reference data submitted - Please note: There is a time window associated with the de-duplication of duplicate submissions which is 60 second',

	INVALID_ORDER: `Order cannot be accepted by the matcher due to the combination of actions. For example, bets being edited are not on the same market, or order includes both edits and placement`,

	INVALID_MARKET_ID: `Market doesn't exist`,

	PERMISSION_DENIED: `Business rules do not allow order to be placed. You are either attempting to place the order using a Delayed Application Key or from a restricted jurisdiction (i.e. USA)`,

	DUPLICATE_BETIDS: 'duplicate bet ids found',

	SERVICE_UNAVAILABLE: 'The requested service is unavailable',

	REJECTED_BY_REGULATOR:
		'The regulator rejected the order. On the Italian Exchange this error will occur if more than 50 bets are sent in a single placeOrders request.',

	NO_CHASING:
		'A specific error code that relates to Spanish Exchange markets only which indicates that the bet placed contravenes the Spanish regulatory rules relating to loss chasing.',
	REGULATOR_IS_NOT_AVAILABLE: 'The underlying regulator service is not available.',
	TOO_MANY_INSTRUCTIONS: 'The amount of orders exceeded the maximum amount allowed to be executed',
	INVALID_MARKET_VERSION: 'The supplied market version is invalid. Max length allowed for market version is 12.',

	SETTLED: 'A matched bet that was settled normally',
	VOIDED: 'A matched bet that was subsequently voided by Betfair, before, during or after settlement',
	LAPSED: 'Unmatched bet that was cancelled by Betfair (for example at turn in play).',
	CANCELLED: 'Unmatched bet that was cancelled by an explicit customer action.',
};
