// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AppointmentPayment {
    event AppointmentPaid(
        address indexed patient,
        address indexed doctor,
        uint256 amount,
        uint256 timestamp
    );

    event MedicalRecordHashStored(
        address indexed doctor,
        address indexed patient,
        string recordHash,
        uint256 timestamp
    );

    mapping(address => string[]) public patientRecords;

    function payForAppointment(address doctor) external payable {
        require(doctor != address(0), "Invalid doctor address");
        require(msg.value > 0, "Payment required");

        emit AppointmentPaid(msg.sender, doctor, msg.value, block.timestamp);
    }

    function recordMedicalHash(
        address patient,
        string memory recordHash
    ) external {
        require(patient != address(0), "Invalid patient");
        require(bytes(recordHash).length > 0, "Invalid hash");

        patientRecords[patient].push(recordHash);

        emit MedicalRecordHashStored(
            msg.sender,
            patient,
            recordHash,
            block.timestamp
        );
    }

    function getPatientRecords(
        address patient
    ) external view returns (string[] memory) {
        return patientRecords[patient];
    }
}