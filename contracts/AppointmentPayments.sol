// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AppointmentPayment {
    event AppointmentPaid(
        address indexed patient,
        address indexed doctor,
        uint256 amount,
        uint256 timestamp
    );

    function payForAppointment(address doctor) external payable {
        require(doctor != address(0), "Invalid doctor address");
        require(msg.value > 0, "Payment must be greater than zero");

        emit AppointmentPaid(msg.sender, doctor, msg.value, block.timestamp);
    }
}