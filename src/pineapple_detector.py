#!/usr/bin/env python3
"""
WiFi Pineapple & Network Security Detector
==========================================

A comprehensive security test for detecting WiFi Pineapple attacks, 
man-in-the-middle attacks, and system vulnerabilities.

Usage: python3 pineapple_detector.py [--quick] [--verbose]

Based on security analysis methodology that uses established tools
to minimize false positives while detecting real threats.
"""

import subprocess
import json
import datetime
import sys
import os
import argparse
from typing import Dict, List, Optional, Tuple
from src.vpn_security.network_config import VPNConfigDetector

class PineappleDetector:
    def __init__(self, verbose=False):
        # Existing initialization code
        pass

    def detect_vpn_configuration(self) -> Dict:
        """
        Detect and analyze VPN configuration.
        
        Returns:
            Dict containing VPN detection results
        """
        vpn_connection = VPNConfigDetector.detect_vpn_connection()
        
        result = {
            'active_vpn': vpn_connection is not None,
            'vpn_type': self._extract_vpn_type(str(vpn_connection)) if vpn_connection else 'No VPN',
            'interface': vpn_connection.get('interface', '') if vpn_connection else '',
            'server_ip': vpn_connection.get('ip_address', '') if vpn_connection else '',
            'security_warnings': []
        }
        
        self._analyze_vpn_security(result)
        return result

    def _extract_vpn_type(self, connection_details: str) -> str:
        """
        Extract VPN protocol type from connection details.
        
        Args:
            connection_details (str): Details about the VPN connection
        
        Returns:
            str: Detected VPN protocol type
        """
        vpn_type_mapping = {
            'wireguard': 'WireGuard',
            'pptp': 'Point-to-Point Tunneling Protocol',
            'ipsec': 'IPSec VPN',
            'l2tp': 'Layer 2 Tunneling Protocol',
            'openvpn': 'OpenVPN'
        }
        
        connection_details = connection_details.lower()
        for key, vpn_type in vpn_type_mapping.items():
            if key in connection_details:
                return vpn_type
        
        return 'Unknown VPN Protocol'

    def _analyze_vpn_security(self, vpn_result: Dict):
        """
        Perform security analysis on VPN configuration.
        
        Args:
            vpn_result (Dict): VPN configuration details to analyze
        """
        if vpn_result['active_vpn']:
            if vpn_result['vpn_type'] == 'Point-to-Point Tunneling Protocol':
                vpn_result['security_warnings'].append('Weak VPN Protocol')
            
            # Add more specific security checks as needed

    # Rest of the existing PineappleDetector methods...

def main():
    # Existing main function code
    pass

if __name__ == "__main__":
    main()